import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

function App() {
  const [images, setImages] = useState([]);
  const [search, setSearch] = useState('');
  const[page,setPage]=useState(1);

  const fetchImages = (query = '') => {
    const clientId = 'Bl80hODX2QFt-2DRetZ-V8g1GiQ4GDzZDHoTFBNZDMo';
    const url = query
      ? `https://api.unsplash.com/search/photos?page=1&query=${query}&client_id=${clientId}`
      : `https://api.unsplash.com/photos/?client_id=${clientId}`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        if (query) {
          setImages(data.results);
          setSearch('');
        } else {
          setImages(data); // When fetching the default set of images
        }
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const handleSearch = () => {
    if (search.trim() === '') {
      toast.error('Please enter something');
      return;
    }
    fetchImages(search);
  };
  function handelLoad(){
    setPage(prev=> prev+1)
  }


  return (
    <>
  <div className='text'> 
      <div className='header'>
        <h1>GeekImages</h1>
        <div>
          <input
            value={search}
            onChange={(e) => setSearch(e.currentTarget.value)}
            placeholder='Search Any Image'
          />
          <button onClick={handleSearch}>Search</button>
        </div>
      </div>
      {images.length > 0 ? (
        <div className='img-container'>
          {images.map((data, index) => (
            <div key={index} className='img-content'>
              <img src={data.urls.small} alt={data.alt_description} />
            
            </div>
          ))}
        </div>
      ) : (
        <p>Not Found Data please Search Again</p>
      )}
        <button onClick={handelLoad} className='btn'>Load More</button>
        </div>
      <ToastContainer />
    </>
  );
}

export default App;
