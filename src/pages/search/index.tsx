"use client";

import ProductsList from "../../components/Product";

import { Button, Input } from "@chakra-ui/react";

import { useNavigate, useSearchParams } from "react-router-dom";

import { ChangeEvent, useEffect, useState } from "react";

import { GetProductsByQuery } from "../../lib/swr";

const Search = () => {
  // const [query, setQuery] = useState<string>("");
  // const [productsData, setProductsData] = useState<ResponseProducts | null>(null);
  const [searchParams, setSearchParams ] = useSearchParams();
  const query = searchParams?.get("query");
  const { products } = GetProductsByQuery(query);

  const navigate = useNavigate();

  // useEffect (() => {
  //   search && setQuery(search);
  // }, [search])

  const handleSearch = async () => {
    
    console.log(products);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchParams(e.target.value);
  };

  const handleSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate("/serach?query=" + query);
    query !== undefined && handleSearch();
  };

  return (
    <form onSubmit={handleSubmit}>
      <>
        {/* <h1>Discover</h1>
        /* <Input type="text" value={query} onChange={handleInputChange} /> */
        /*<Button type="submit">Search</Button> */}
        {products && products.data.length > 0 ? (
          products.data.map((product) => {
            return (
              <li key={product._id}>
                <ProductsList {...product} />
              </li>
            );
          })
        ) : (
          <h1>no products</h1>
        )}
      </>
    </form>
  );
};

export default Search;
