import "./BuyerHomePage.css";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Products from "../../components/Products/Products";
import { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Filter = styled.div`
  margin: 20px;
`;

const FilterText = styled.span`
  font-size: 20px;
  font-weight: 600;
  margin-right: 20px;
  color: white;
`;

const Select = styled.select`
  padding: 10px;
  margin-right: 20px;
`;
const Option = styled.option``;

const BuyerHomepage = ({user}) => {
  const [sort, Setsort] = useState('newest')
  const [filters, setFilters] = useState({});
  
  const handleFilters = (e) => {
    const value = e.target.value
    setFilters({
      [e.target.name]:value
    })
  }

  return (
    <div className="buyerhomepage">
      <Navbar />
      <FilterContainer>
      <Filter>
          <FilterText>Filter Products:</FilterText>
          <Select name="negotiable" onChange={handleFilters}>
            <Option disabled selected>Negotiable</Option>
            <Option>true</Option>
            <Option>false</Option>
          </Select>
        </Filter>
        <Filter>
          <FilterText>Sort Products:</FilterText>
          <Select onChange={e=>Setsort(e.target.value)}>
            <Option value='newest' selected>Newest</Option>
            <Option value='asc'>Price (asc)</Option>
            <Option value='desc'>Price (desc)</Option>
          </Select>
        </Filter>
        <Filter>
          <Link to={"/buyercategory"} style={{ textDecoration: "none" }}>
            <FilterText>Category</FilterText>
          </Link>
        </Filter>
      </FilterContainer>
      <Products user={user}  sort={sort} filters={filters} />
      <Link to={"/buyerhomepage"}>
        <button className="efgh">BUY</button>
      </Link>
      <Link to={"/sellercategory"}>
        <button className="efgh">SELL</button>
      </Link>
    </div>
  );
};

export default BuyerHomepage;
