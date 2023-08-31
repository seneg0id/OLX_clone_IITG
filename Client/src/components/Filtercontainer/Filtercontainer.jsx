import styled from "styled-components";
import { Link } from "react-router-dom";

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
  color:white;
`;

const Select = styled.select`
  padding: 10px;
  margin-right: 20px;
`;
const Option = styled.option``;

const Filtercontainer = () => {
  return (
    <FilterContainer>
        <Filter>
          <FilterText>Sort Products:</FilterText>
          <Select>
            <Option selected>Newest</Option>
            <Option>Price (asc)</Option>
            <Option>Price (desc)</Option>
          </Select>
          </Filter>
          <Filter>
              <Link to={'/buyercategory'} style={{ textDecoration: 'none' }}     ><FilterText>Category</FilterText></Link> 
          </Filter>
      </FilterContainer>
  )
}

export default Filtercontainer