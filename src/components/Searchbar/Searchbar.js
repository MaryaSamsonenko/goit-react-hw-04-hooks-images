import { useState } from "react";
import PropTypes from "prop-types";
import "react-toastify/dist/ReactToastify.css";
import {
  SearchbarStyle,
  SearchForm,
  SearchFormButton,
  SearchFormButtonLabel,
  SearchFormInput,
} from "./Searchbar.styled";
export const Searchbar = ({ onSubmit }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleImageChange = (event) => {
    setSearchQuery(event.currentTarget.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(searchQuery);
    setSearchQuery("");
  };

  return (
    <SearchbarStyle>
      <SearchForm onSubmit={handleSubmit}>
        <SearchFormButton type="submit">
          <SearchFormButtonLabel>Search</SearchFormButtonLabel>
        </SearchFormButton>
        <SearchFormInput
          type="text"
          name="searchQuery"
          value={searchQuery}
          onChange={handleImageChange}
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </SearchForm>
    </SearchbarStyle>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
