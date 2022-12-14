import React from "react";
import { useEffect, useState, useContext } from "react";
import logo from "./images/techdivision-logo.png";
import { Link, useNavigate } from "react-router-dom";
import { IconLabel } from "./components/IconLabel";
import { useWindowSize } from "./hooks/useWindowSize.hook";
import { AuthContext } from "./context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faUser,
  faCartShopping,
  faEarthAmericas,
  faPhone,
  faSignIn,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";

const mainPath = "";

const header = {
  language: "de",
  info: {
    company: "unternhemen",
    phone: "+49 8031 221 055 0",
    welcome: "Willkomen bei Techdivision",
  },
  navigation: {
    search: "Suche",
    shoppingCart: "Warenkorb",
    account: "Mein Konto",
    registration: "Register",
    login: "Login",
    logout: "Logout",
    items: [
      { name: "fashion", slug: "/" },
      { name: "elektronik", slug: "/" },
      { name: "lebensmittel", slug: "/" },
      { name: "mashinenbau", slug: "/" },
      { name: "landingpage", slug: "/" },
      { name: "sale", slug: "/", color: "red-800" },
    ],
  },
  title: "Kostenloser Versand - Kostenlose Ruckgabe",
};

export const Header = (props) => {
  const { isAuthPage } = props;
  const auth = useContext(AuthContext);

  const size = useWindowSize();
  const [isHidden, toggleMenu] = useState(size.width < 768);

  useEffect(() => {
    toggleMenu(size.width < 768);
  }, [size, toggleMenu]);

  return (
    !isAuthPage && (
      <div className="header w-full bg-grey-100">
        <HeaderInfo language={header.language} info={header.info} />
        <nav className="w-full relative">
          <button
            className="absolute top-5 right-5 md:hidden"
            onClick={() => {
              toggleMenu(!isHidden);
            }}
          >
            <div className="h-1 w-8 bg-black after:h-1 after:w-8 after:bg-black after:translate-y-2 after:content-[''] after:absolute after:top-0 after:left-0 before:h-1 before:w-8 before:bg-black before:-translate-y-2 before:content-[''] before:absolute before:top-0 before:left-0"></div>
          </button>
          <NavigationFunctions
            isAuthenticated={auth.isAuthenticated}
            navigation={header.navigation}
            status={!isHidden}
          />
          <NavigationMenu
            navItems={header.navigation.items}
            status={!isHidden}
          />
          <TestNavigationMenu />
        </nav>

        <HeaderTitle title={header.title} />
      </div>
    )
  );
};

const HeaderInfo = (props) => {
  const { language, info } = props;
  return (
    info &&
    language && (
      <div className="hidden md:flex w-full h-8 px-2 md:px-16 lg:px-32 bg-grey-100 uppercase justify-between items-center text-grey-400">
        <IconLabel icon={<FontAwesomeIcon icon={faEarthAmericas} />}>
          {language} {info.company}
        </IconLabel>
        <IconLabel icon={<FontAwesomeIcon icon={faPhone} />}>
          {info.phone}
        </IconLabel>
        <span>{info.welcome}</span>
      </div>
    )
  );
};

const NavigationFunctions = (props) => {
  const auth = useContext(AuthContext);
  const { isAuthenticated } = props;
  const navigate = useNavigate();
  return (
    props.navigation && (
      <div className="w-full px-2 md:px-[7.5%] lg:px-[15%] bg-grey-0 border-y border-grey-300/50 divide-grey-300/50 flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x">
        <NavigationFunctionWrapper>
          <div className="w-full h-full flex md:block justify-center">
            <img className="max-h-full p-1" src={logo} alt="Website Logo" />
          </div>
        </NavigationFunctionWrapper>
        <NavigationFunctionWrapper className={!props.status && "hidden"}>
          <form className="w-full h-full relative">
            <input
              className="pl-2 w-full h-full outline-none"
              type="search"
              placeholder={props.navigation.search}
            />
            <button
              className="absolute right-0 top-[50%] -translate-y-1/2 p-1 mr-3 outline-none"
              type="submit"
            >
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </button>
          </form>
        </NavigationFunctionWrapper>
        <NavigationFunctionWrapper className={!props.status && "hidden"}>
          <div className="w-full h-full flex justify-center space-x-6">
            {isAuthenticated ? (
              <>
                <button
                  onClick={() => {
                    navigate(`${mainPath}/users/${auth.userId}`);
                  }}
                >
                  <IconLabel icon={<FontAwesomeIcon icon={faUser} />}>
                    {props.navigation.account}
                  </IconLabel>
                </button>
                <button
                  onClick={() => {
                    navigate(`${mainPath}/users/${auth.userId}/cart`);
                  }}
                >
                  <IconLabel icon={<FontAwesomeIcon icon={faCartShopping} />}>
                    {props.navigation.shoppingCart}
                  </IconLabel>
                </button>
                <button
                  onClick={() => {
                    auth.logout();
                    navigate(`${mainPath}/`);
                  }}
                >
                  <IconLabel icon={<FontAwesomeIcon icon={faSignIn} />}>
                    {props.navigation.logout}
                  </IconLabel>
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => {
                    navigate(`${mainPath}/auth/login`);
                  }}
                >
                  <IconLabel icon={<FontAwesomeIcon icon={faSignIn} />}>
                    {props.navigation.login}
                  </IconLabel>
                </button>
                <button
                  onClick={() => {
                    navigate(`${mainPath}/auth/register`);
                  }}
                >
                  <IconLabel icon={<FontAwesomeIcon icon={faUserPlus} />}>
                    {props.navigation.registration}
                  </IconLabel>
                </button>
              </>
            )}
          </div>
        </NavigationFunctionWrapper>
      </div>
    )
  );
};
const NavigationFunctionWrapper = (props) => {
  const { className } = props;
  const wrapperClass = "w-full h-10 " + className;
  return props.children && <div className={wrapperClass}>{props.children}</div>;
};

const NavigationMenu = (props) => {
  return (
    props.navItems &&
    props.status && (
      <div className="w-full min-h-fit py-2 px-2 md:px-[7.5%] lg:px-[15%] bg-grey-0">
        <ul className="flex justify-between flex-col md:flex-row">
          {props.navItems.map((navItem, i) => (
            <NavItem key={i} navItem={navItem} />
          ))}
        </ul>
      </div>
    )
  );
};

const TestNavigationMenu = (props) => {
  const items = [
    { name: "front", slug: "/" },
    { name: "create", slug: "/users/6304f88d74e044c19867239c/create" }
  ];

  return (
    <div className="w-full min-h-fit py-2 px-2 md:px-[7.5%] lg:px-[15%] bg-grey-300">
      <ul className="flex justify-between flex-col md:flex-row">
        {items.map((navItem, i) => (
          <NavItem key={i} navItem={navItem} />
        ))}
      </ul>
    </div>
  );
};

const HeaderTitle = (props) => {
  return (
    props.title && (
      <div className="w-full h-16 px-2 md:px-16 lg:px-32 bg-grey-100 flex justify-center items-center">
        <h1 className="text-sm text-grey-black">{header.title}</h1>
      </div>
    )
  );
};

const NavItem = (props) => {
  const { navItem } = props;
  const { slug, name } = navItem;
  const color = navItem.color ? "text-" + navItem.color : "";
  const className = "uppercase font-black " + color;
  return (
    <li>
      <Link className={className} to={mainPath + slug}>
        {name}
      </Link>
    </li>
  );
};
