import { AuthContext } from "@/context/auth";
import Link from "next/link";
import { useContext } from "react";


export default function Drawer({
    children
}) {
    const { handleLogout, role } = useContext(AuthContext);

    let links = [
        { href: '/product', label: 'Product' },
        { href: '/user', label: 'User' },
    ];

    if (role==="seller" || role==="customer"){
        links = [ links[0] ];
    }

    return (
        <div className="drawer drawer-mobile max-h-fit h-auto text-sm">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content max-h-fit">
                {children}
            </div>
            <div className="drawer-side min-h-screen h-auto z-500 shadow-lg">
                <label htmlFor="my-drawer-2" className="drawer-overlay max-h-fit bg-slate-900" ></label>
                <ul className="menu p-4 w-80 bg-base-100 text-base-content">
                    {
                        links.map(
                            (value) => (
                                <>
                                    <li key={value.href+ value.label}>
                                        <Link href={value.href}>{value.label}</Link>
                                    </li>
                                </>
                            )
                        )
                    }
                    <li>
                        <a onClick={()=>handleLogout()}>Logout</a>
                    </li>
                </ul>

            </div>
        </div>

    );
}
