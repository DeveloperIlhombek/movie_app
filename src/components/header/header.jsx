import { NavLink } from 'react-router-dom'
import { navbar_links } from '../../constants'
import './header.scss'

const Navbar = () => {
	return (
		<div className='navbar'>
			<h1 className='navbar	__logo'>
				<a href='#'>
					<img src='/logo.svg' alt='logo' />
					<img src='/logo-text.svg' alt='logo-text' />
				</a>
			</h1>
			<nav className='navbar__menu'>
				<ul>
					{navbar_links.map(item => (
						<li key={item.path}>
							<NavLink
								to={item.route}
								className={({ isActive }) => (isActive ? 'active' : '')}
							>
								{item.label}
							</NavLink>
						</li>
					))}
				</ul>
			</nav>
		</div>
	)
}

export default Navbar
