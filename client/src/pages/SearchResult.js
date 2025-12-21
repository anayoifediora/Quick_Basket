import React from "react";
import { useQuery } from "@apollo/client";
import { QUERY_SEARCH_RESULTS } from "../utils/queries";
import { useSelector, useDispatch } from "react-redux";

//Components
import { clearSearchTerm } from "../State/searchTermSlice";

const SearchResult = () => {
  // const cart = useSelector((state) => state.cart);
  const searchTerm = useSelector((state) => state.searchTerm);
  const dispatch = useDispatch();

  const { loading, data } = useQuery(QUERY_SEARCH_RESULTS, {
    //pass the searchTerm as a variable to the query
    variables: { keyWord: searchTerm },
  });

  const result = data?.resultProducts || [];

  return (
    <div>
      {loading ? (
        <h3>Loading...</h3>
      ) : (
        <div className="search-result-page">
          <div
            style={{
              gridColumn: "span 3",
              textAlign: "center",
              marginTop: "20px",
            }}
            className="d-flex justify-content-between"
          >
            <h3 style={{ fontSize: "clamp(1rem, 2.3vw, 1.7rem)" }}>
              Displaying {result.length} results...
            </h3>
            <i
              onClick={() => dispatch(clearSearchTerm())}
              className="bi bi-x-square-fill fs-2"
            ></i>
          </div>
          <div className="search-results">
            {result.length ? (
              result.map((product, index) => (
                <div className="product-card m-3" key={index}>
                  <a href={`/products/${product._id}`}>
                    <img
                      className="product-image"
                      src={product.images[0]}
                      alt=""
                    />
                  </a>
                  <div className="product-details">
                    <p className="product-price">${product.price.toFixed(2)}</p>
                    <p className="product-name">{product.productName}</p>
                    <p className="product-rating text-body-secondary">
                      Rating:{" "}
                      {!product.averageRating
                        ? "No ratings yet"
                        : product.averageRating}{" "}
                      <i
                        style={
                          !product.averageRating
                            ? { color: "white" }
                            : { color: "gold" }
                        }
                        class="bi bi-star-fill"
                      ></i>
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="no-search-results">
                <h3 className="text-muted ">
                  No products found matching your search.
                </h3>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchResult;
