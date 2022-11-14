import { NavLink } from "react-router-dom"
import styled from "styled-components"

const HeaderSection = styled.header.attrs(() => ({
  className: `bg-header w-full h-20`
}))``;

const Navigation = styled.nav.attrs(() => ({
  className: `h-full`
}))``;

const MenuSection = styled.ul.attrs(() => ({
  className: `flex justify-center space-x-4 items-center h-full`
}))``;

const Menu = styled.li.attrs(() => ({
  className: ``
}))``;

const MenuItem = styled(NavLink)`
  color: white;
  &:hover {
    color: #95bcf0;
    padding-bottom: 0.25rem;
    border-bottom: 4px solid #95bcf0;
  }
  &.${props => props.isActive} {
    color: #95bcf0;
    padding-bottom: 0.25rem;
    border-bottom: 4px solid #95bcf0;
  }
`;

export default function Header() {

  return (
    <HeaderSection>
      <Navigation>
        <MenuSection>
          <Menu>
            <MenuItem
              to="/"
              isActive={({ isActive }) =>
                isActive ? 'active' : undefined
              }
            >
              Home
            </MenuItem>
          </Menu>
          <Menu>
            <MenuItem
              to="/product"
              isActive={({ isActive }) =>
                isActive ? 'active' : undefined
              }
            >
              Product
            </MenuItem>
          </Menu>
          <Menu>
            <MenuItem
              to="/cart"
              isActive={({ isActive }) =>
                isActive ? 'active' : undefined
              }
            >
              Cart
            </MenuItem>
          </Menu>
        </MenuSection>
      </Navigation>
    </HeaderSection>
  )
}
