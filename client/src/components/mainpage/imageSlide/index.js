import styled from 'styled-components';
import "react-alice-carousel/lib/alice-carousel.css";
import AliceCarousel from 'react-alice-carousel';
import image1 from "./image/1087848276_w1197.jpg";
import image2 from "./image/1091020512_w1197.jpg";
import image3 from "./image/1091020512_w1197.jpg";


const imageSlide = () => {

  const responsive = {
    0: {
      items: 1,
    }
};

const handleDragStart = (e) => e.preventDefault();

const images = [
  image1,
  image2,
  image3
];

const items = images.map((image) => {
  return (
    <ItemsContain>
    <ItemsWrap>
      <img src={image} alt="" />
    </ItemsWrap>
    </ItemsContain>
  )
})

return (
  <Contain>
    <AliceCarousel
      mouseTracking
      infinite={1000}
      animationDuration={5000}
      disableDotsControls
      disableButtonsControls
      responsive={responsive}
      autoPlay
      items={items}
      paddingRight={30}
    />
  </Contain>
)
}
export default imageSlide;

const Contain = styled.div`
  width:100%;
  display:flex;
  align-items:center;
  margin:0 auto;
  height: 15vw;
`

const ItemsContain = styled.div`
  width:100%;
  height:100%;
  padding: 0 10px;
  height: 15vw;
`

const ItemsWrap = styled.div`
  width:100%;
  border-radius:1vw;
  overflow:hidden;
  margin:0 2vw;
  height: 15vw;

  img{
    width:100%;
    height:100%;
    object-fit:cover;
    height: 15vw;
  }
 `