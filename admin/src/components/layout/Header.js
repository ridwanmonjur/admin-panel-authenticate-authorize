import { AuthContext } from "@/context/auth";
import { useContext } from "react";

const links = [
    // { href: '#logout', label: 'Logout' },
];

const myName = 'Product App';

const NavbarLinks = ({ handleLogout }) => {
    return (
        <>
            {
                links.map(
                    (value) => (
                        <>
                            <li>
                                <Link href={value.href}>{value.label}</Link>
                            </li>
                        </>
                    )
                )
            }
            <li>
                <a onClick={()=> handleLogout()} href="#">Logout</a>
            </li>
        </>
    );
}

const Company = () => {
    return (
        <div>
            <img src='/ms-icon-310x310.png' className="w-10 h-10 ml-4 rounded-full inline" />
            <a className='p-2 text-base ml-4 font-extrabold normal-case relative top-1'>
                {myName}
            </a>
        </div>
    )
}

export default function Header() {
    const { handleLogout } = useContext(AuthContext);

    return (
        <div className='border-gray navbar border-b bg-slate-50 shadow-lg text-base'>
            <div className='navbar-start'>
                <div className='dropdown'>
                    <label tabIndex={0} className='btn-ghost btn lg:hidden'>
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            className='h-8 w-8'
                            fill='none'
                            viewBox='0 0 24 24'
                            stroke='currentColor'
                        >
                            <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth='2'
                                d='M4 6h16M4 12h8m-8 6h16'
                            />
                        </svg>
                    </label>
                    <ul
                        tabIndex={0}
                        className='dropdown-content menu rounded-box mt-3 w-[95vw] bg-base-100 p-2 text-center text-base shadow'
                    >
                        <NavbarLinks handleLogout={handleLogout} />
                    </ul>
                </div>
                <div className="hidden lg:block align-middle">
                    <Company />
                </div>
            </div>
            <div className='navbar-end hidden lg:flex'>
                <ul className='menu menu-horizontal px-1 text-base font-semibold'>
                    <NavbarLinks handleLogout={handleLogout} />
                </ul>
            </div>
            <div className='navbar-end block lg:hidden text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-indigo-600 to-pink-600'>
                <Company />
            </div>
        </div>
    );
}
