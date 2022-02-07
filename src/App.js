import {useState} from 'react';
import {Container} from 'react-bootstrap';
import './App.css';

const Slider = (props) => {

    //const [slide, setSlide] = useState(0);
    //const [autoplay, setAutoplay] = useState(false);
    const [state, setState] = useState({slide: 0, autoplay: false});

    function changeSlide(i) {
        setState(state => ({...state, slide: state.slide + i})); // callback func: учитываем пред. состояние
    }

    function toggleAutoplay() {
        setState(state => ({...state, autoplay: !state.autoplay}));  // callback func
    }

/*     function changeSlide(i) {
        setSlide(slide => slide + i); // callback func: учитываем пред. состояние
    }

    function toggleAutoplay() {
        setAutoplay(autoplay => !autoplay);  // callback func
    } */

    return (
        <Container>
            <div className="slider w-50 m-auto">
                <img className="d-block w-100" src="https:www.planetware.com/wpimages/2020/02/france-in-pictures-beautiful-places-to-photograph-eiffel-tower.jpg" alt="slide" />
                <div className="text-center mt-5">Active slide {state.slide}<br/>{state.autoplay ? 'auto' : null}</div>
                <div className="buttons mt-3">
                    <button 
                        className="btn btn-primary me-2"
                        onClick={() => changeSlide(-1)}>-1</button>
                    <button 
                        className="btn btn-primary me-2"
                        onClick={() => changeSlide(1)}>+1</button>
                    <button 
                        className="btn btn-primary me-2"
                        onClick={toggleAutoplay}>toggle autoplay</button>
                </div>
            </div>
        </Container>
    )
}


function App() {
  return (
        <Slider/>
  );
}

export default App;
