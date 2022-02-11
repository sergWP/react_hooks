import {useState, useEffect, useCallback} from 'react';
import {Container} from 'react-bootstrap';
import './App.css';

const Slider = (props) => {

    const [slide, setSlide] = useState(0);
    const [autoplay, setAutoplay] = useState(false);

    // Это полезно при передаче колбэков оптимизированным дочерним(!) компонентам,
    const getSomeImages = useCallback(() => {
        console.log('useCallback!');
        return [
            "https:www.planetware.com/wpimages/2020/02/france-in-pictures-beautiful-places-to-photograph-eiffel-tower.jpg",
            "https:www.planetware.com/wpimages/2020/02/france-in-pictures-beautiful-places-to-photograph-eiffel-tower.jpg"
        ]
    }, [])

    function loggin() {
        console.log('log!');
    }

    // Используя этот хук, вы говорите React сделать что-то после рендера. 
    // React запомнит функцию (то есть «эффект»), которую вы передали и вызовет её после того, как внесёт все изменения в DOM
    // следит за стейтом slide
    // игнорирует autoplay
    useEffect(() => {

        document.title = `Slide: ${slide}`;
        window.addEventListener('click', loggin);
        return () => {
            window.removeEventListener('click', loggin); // отписка от обработчика событий
        }

    }, [slide]); // второй арг. можно оставить пустым массивом - запуститься только 1 раз при первом рендере

    function changeSlide(i) {
        setSlide(slide => slide + i); // callback func: учитываем пред. состояние
    }

    function toggleAutoplay() {
        setAutoplay(autoplay => !autoplay);  // callback func
    }

    return (
        <Container>
            <div className="slider w-50 m-auto">
                <Slide getSomeImages={getSomeImages} />
                <div className="text-center mt-5">Active slide {slide}<br/>{autoplay ? 'auto' : null}</div>
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

// дочерний компонент
const Slide = ({getSomeImages}) => {
    const [images, setImages] = useState([]);

    useEffect(() => {
        setImages(getSomeImages())
    }, [getSomeImages])

    return (
        <>
            {images.map((url, i) => <img key={i} className="d-block w-100" src={url} alt="slide" />)}
        </>
    )
}

function App() {
    const [slider, setSlider] = useState(true);
    return (
        <>
            <button onClick={() => setSlider(false)}>Click</button>
            {slider ? <Slider/> : null}
        </> 
    );
}

export default App;
