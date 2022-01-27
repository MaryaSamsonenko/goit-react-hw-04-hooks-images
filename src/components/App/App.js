import { useState, useEffect } from "react";
import { ToastContainer, Zoom, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { Grid } from "react-loader-spinner";
import { apiServices } from "../../services/api";
import { Searchbar } from "../Searchbar/Searchbar";
import { ImageGallery } from "../ImageGallery/ImageGallery";
import { Button } from "../Button/Button";
import { Modal } from "../Modal/Modal";
import { Container, Wrapper } from "./App.styled";

export const App = () => {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(0);
  const [imageCards, setImageCards] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [largeImage, setLargeImage] = useState("");
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(null);

  useEffect(() => {
    if (!query) {
      return;
    }
    const fetchImages = async () => {
      try {
        toggleLoader(true);
        const data = await apiServices(query, page);
        if (data.hits.length === 0) {
          toast.warn("Nothing found with your search query");
          setLoading(false);
          setTotalPages(null);
          return;
        }
        setImageCards((imageCards) => [...imageCards, ...data.hits]);
        const totalHits = data.totalHits;
        setTotalPages(Math.ceil(totalHits / 12));
      } catch (error) {
        console.log(error);
        setError(error.message);
      } finally {
        toggleLoader(false);
      }
    };

    fetchImages();
  }, [query, page]);

  const handleFofmSubmit = (searchQuery) => {
    setQuery(searchQuery);
    setPage((prevPage) => prevPage + 1);
    setImageCards([]);
  };

  const setModalImage = (imageLink) => {
    return setLargeImage(imageLink);
  };

  const openLargeImage = (imageLink) => {
    setModalImage(imageLink);
    toggleModal();
  };

  const handleOnClick = () => {
    toggleLoader(true);
    setPage((prevPage) => prevPage + 1);
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const toggleLoader = (boolean) => {
    setLoading(boolean);
  };

  return (
    <Container>
      <Searchbar onSubmit={handleFofmSubmit} />
      {totalPages > 0 && !error && (
        <>
          <ImageGallery
            imageCards={imageCards}
            onClick={toggleModal}
            modalOpen={openLargeImage}
          />
          {totalPages > 1 && page !== totalPages && !loading && (
            <Button onClick={handleOnClick} />
          )}
        </>
      )}
      {showModal && (
        <Modal onClose={toggleModal}>
          <img src={largeImage} alt="largeImage" />
        </Modal>
      )}
      {loading && (
        <Wrapper>
          <Grid heigth="80" width="80" color="#303f9f" ariaLabel="loading" />
        </Wrapper>
      )}
      {error && <h3 className="Message">Oops, please try again</h3>}
      <ToastContainer limit={3} autoClose={2000} transition={Zoom} />
    </Container>
  );
};
