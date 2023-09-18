import React from 'react';
import NavbarSearch from '@theme/Navbar/Search';
import SearchBar from '@theme/SearchBar';
import Header from '../../components/other/Header';

export default function Navbar({purpleMode = true}) {

  const currentPath = window.location.pathname;
  const firstPartOfPath = currentPath.split('/')[1];
  const docsActive = firstPartOfPath === 'docs' || firstPartOfPath === 'faq'

  const Search = () => {
    return (
      <NavbarSearch>
        {docsActive && <SearchBar />}
      </NavbarSearch>
    )
  }


  return (
    <Header purpleMode={purpleMode}>
      <Search/>
    </Header>
  );
}
