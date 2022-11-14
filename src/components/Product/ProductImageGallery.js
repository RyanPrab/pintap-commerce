import ImageGallery from 'react-image-gallery';
import styled from 'styled-components';
import "react-image-gallery/styles/css/image-gallery.css";

const Section = styled.div.attrs(() => ({
  className: `flex`
}))``;

export default function ProductImageGallery(props) {
  const { productImages } = props;

  const images = productImages.map(images => {
    const newImages = {
      original: images,
      thumbnail: images
    };

    return newImages;
  });

  return (
    <Section>
      <ImageGallery
        items={images}
        showFullscreenButton={false}
        showPlayButton={false}
      />
    </Section>
  )
}
