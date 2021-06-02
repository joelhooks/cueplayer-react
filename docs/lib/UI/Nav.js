import React from 'react'
import {Link} from 'react-router'
import {
  NavbarToggler,
  Container,
  Collapse,
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap'

export default class UINav extends React.Component {
  constructor(props) {
    super(props)

    this.toggleNavbar = this.toggleNavbar.bind(this)
    this.state = {
      showNavbar: false,
    }
  }

  toggleNavbar(e) {
    e.preventDefault()
    this.setState(state => ({
      showNavbar: !state.showNavbar,
    }))
  }

  render() {
    return (
      <Navbar className="header" color="faded" light expand="md">
        <Container>
          <NavbarToggler onClick={this.toggleNavbar} />
          <NavbarBrand className="mr-auto" tag={Link} to="/">
            cueplayer-react
          </NavbarBrand>
        </Container>
      </Navbar>
    )
  }
}
