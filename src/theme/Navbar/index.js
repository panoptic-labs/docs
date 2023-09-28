import React from 'react';
import NavbarSearch from '@theme/Navbar/Search';
import SearchBar from '@theme/SearchBar';
import Header from '../../components/other/Header';

export default function Navbar({purpleMode = true}) {

  const Search = () => {
    return (
      <NavbarSearch>
        <SearchBar />
      </NavbarSearch>
    )
  }

  return (
    <Header purpleMode={purpleMode}>
      <Search/>
    </Header>
  );
}
