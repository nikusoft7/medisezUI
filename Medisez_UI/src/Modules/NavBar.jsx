import logo_main from '../img/logo_main.svg';
import search from '../img/search.png';
import {Dropdown} from 'primereact';
import { useEffect, useState } from 'react';
import { authFetch } from '../utils/authfetch';
const NavBar = () => {
  const [selectedCity, setSelectedCity] = useState(null);
  const [cities, setCities] = useState([]);
  const [userTypes, setUserTypes] = useState([]);
  const [defaultuserTypes, setDefaultUserTypes] = useState([]);
  const [selectedUserType, setSelectedUserType] = useState(null);


  const fetchCities=async()=>{
    var results=await authFetch('https://catfact.ninja/fact','GET');
    console.log(results,'results');
    const staticCities = [{"CityId":1,"City":"Visakhapatnam","IsActive":true,"IsDefault":true,"UserTypes":"[{\"CityId\":1,\"UserTypeId\":1,\"UserType\":\"Doctor\",\"IsActive\":true},{\"CityId\":1,\"UserTypeId\":2,\"UserType\":\"Hospital\",\"IsActive\":true},{\"CityId\":1,\"UserTypeId\":3,\"UserType\":\"Diagnostics\",\"IsActive\":true},{\"CityId\":1,\"UserTypeId\":4,\"UserType\":\"Pharmacies\",\"IsActive\":true}]"},{"CityId":2,"City":"Vizianagaram","IsActive":true,"IsDefault":false,"UserTypes":"[{\"CityId\":2,\"UserTypeId\":1,\"UserType\":\"Doctor\",\"IsActive\":true},{\"CityId\":2,\"UserTypeId\":2,\"UserType\":\"Hospital\",\"IsActive\":true},{\"CityId\":2,\"UserTypeId\":3,\"UserType\":\"Diagnostics\",\"IsActive\":true}]"},{"CityId":3,"City":"Srikakulam","IsActive":true,"IsDefault":false,"UserTypes":"[{\"CityId\":3,\"UserTypeId\":1,\"UserType\":\"Doctor\",\"IsActive\":true},{\"CityId\":3,\"UserTypeId\":2,\"UserType\":\"Hospital\",\"IsActive\":true},{\"CityId\":3,\"UserTypeId\":3,\"UserType\":\"Diagnostics\",\"IsActive\":true},{\"CityId\":3,\"UserTypeId\":4,\"UserType\":\"Pharmacies\",\"IsActive\":true}]"}]
    const citiesWithCityId = staticCities.map((city) => ({
      name: city.City,
      code: city.CityId,
    }));
    
    // Parse and map UserTypes for each city
    const userTypes = staticCities
      .flatMap((city) =>
        JSON.parse(city.UserTypes).filter((userType) => userType.IsActive).map((userType) => ({
          code: userType.UserTypeId,
          name: userType.UserType,
          cityId: userType.CityId,
        }))
      );
    
    // Find the default city
    const defaultCity = staticCities.find((city) => city.IsDefault);
    
    if (defaultCity) {
      setSelectedCity({
        name: defaultCity.City,
        code: defaultCity.CityId,
      });
    
      // Find UserTypes for the default city
      const defaultUserTypes = userTypes.filter((user) => user.cityId === defaultCity.CityId);
      setDefaultUserTypes(defaultUserTypes)
      if (defaultUserTypes.length > 0) {
        setSelectedUserType(
          defaultUserTypes[0]
        );
      }
    }
    
    // Set the options
    setCities(citiesWithCityId);
    setUserTypes(userTypes);
  }
  useEffect(()=>{
    fetchCities()
  },[])
  useEffect(()=>
  {
 const ChangeUserTypes=async()=>{
  changeUserTypeByCityId()
 }
 ChangeUserTypes();

  },[selectedCity])
  const changeUserTypeByCityId=async()=>{
    const defaultUserTypes = userTypes.filter((user) => user.cityId === selectedCity.code);
    setDefaultUserTypes(defaultUserTypes)
    if (defaultUserTypes.length > 0) {
      setSelectedUserType(
        defaultUserTypes[0]
      );
    }
  }
  return (
    <div class="fixed-top">
      <header class="header">
        <nav class="navbar navbar-expand-lg header-nav fixed">
          <div class="navbar-header">
            <a id="mobile_btn" href="javascript:void(0);">
              <span class="bar-icon">
                <span></span>
                <span></span>
                <span></span>
              </span>
            </a>
            <a href="index.html" class="navbar-brand logo">
              <img
                src={logo_main}
                class="img-fluid logo-p"
                alt="Logo"
              />
            </a>
          </div>
          <div class="main-menu-wrapper">
            <div class="menu-header">
              <a href="index.html" class="menu-logo">
                <img src={logo_main} class="img-fluid" alt="Logo" />
              </a>
              <a id="menu_close" class="menu-close" href="javascript:void(0);">
                <i class="fas fa-times"></i>
              </a>
            </div>
            <ul class="main-nav">
              <li class="active">
                <a href="index.html">Home</a>
              </li>
              <li class="has-submenu">
                <a href="index.html">About Us</a>
              </li>
              <li class="has-submenu">
                <a href="index.html">Contact Us</a>
              </li>
              <li class="has-submenu">
                <a href="index.html">Q&amp;A</a>
              </li>
              <li class="has-submenu">
                <a href="index.html">Health Articles</a>
              </li>

              <li class="login-link">
                <a href="login.html">Login / Signup</a>
              </li>
            </ul>
          </div>
          <ul class="nav header-navbar-rht">
            <li class="nav-item contact-item">
              <div class="header-contact-img">
                <i class="far fa-phone-alt"></i>
              </div>
              <div class="header-contact-detail">
                <p class="contact-info-header"> +91 800 800 6789</p>
              </div>
            </li>
            <li class="nav-item">
              <a class="nav-link header-login" href="#">
                login / Signup{" "}
              </a>
            </li>
          </ul>
        </nav>
      </header>
      <div class="search-sec">
        <div class="search-box">
          <form action="#" style={{justifyContent: 'center'}}>
<div>
        <Dropdown
          value={selectedCity}
          onChange={(e) => setSelectedCity(e.value)}
          options={cities}
          optionLabel="name"
          dropdownIcon='none'
          showClear
          placeholder="Select a City"
          filter // Enable search functionality
          filterBy="name" // Specify the field to filter by
          style={{
            width: '200px',
            height: '46px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            padding: '12px',
            boxSizing: 'border-box',
            backgroundImage: 'none',
            fontfamily: 'Poppins',
            color: '#11157a'
          }}
          panelStyle={{
            backgroundColor: '#ffffff !important',
            border: '1px solid #ddd !important',
            borderRadius: '6px !important',
            padding: '8px 0 !important',
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2) !important',
            zIndex: '100000 !important',
            maxHeight: '230px ',
            overflowY: 'auto ',
            position: 'absolute !important', // Ensure the panel is positioned correctly
            top: '100% !important', // Aligns the panel below the dropdown
            left: '0 !important', // Aligns the panel with the dropdown
            width: 'calc(100% - 2px) !important', // Matches the dropdown width
          }}
          itemTemplate={(option) => (
            <div
              style={{
                padding: '8px 16px',
                cursor: 'pointer',
                fontSize: '14px',
                color: '#11157a',
                backgroundColor: '#f9f9f9',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#e6e6e6')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#f9f9f9')}
            >
              {option.name}
            </div>
          )}
        />
      </div>

            <div >
              <Dropdown
          value={selectedUserType}
          onChange={(e) => setSelectedUserType(e.value)}
          options={defaultuserTypes}
          optionLabel="name"
          dropdownIcon='none'
          showClear
          placeholder="Select a User type"
          filter // Enable search functionality
          filterBy="name" // Specify the field to filter by
          style={{
            width: '200px',
            height: '46px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            padding: '12px',
            boxSizing: 'border-box',
            backgroundImage: 'none',
            fontfamily: 'Poppins',
            color: '#11157a'
          }}
          panelStyle={{
            backgroundColor: '#ffffff !important',
            border: '1px solid #ddd !important',
            borderRadius: '6px !important',
            padding: '8px 0 !important',
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2) !important',
            zIndex: '100000 !important',
            maxHeight: '230px' ,
            overflowY: 'auto ',
            position: 'absolute !important', // Ensure the panel is positioned correctly
            top: '100% !important', // Aligns the panel below the dropdown
            left: '0 !important', // Aligns the panel with the dropdown
            width: 'calc(100% - 2px) !important', // Matches the dropdown width
          }}
          itemTemplate={(option) => (
            <div
              style={{
                padding: '8px 16px',
                cursor: 'pointer',
                fontSize: '14px',
                color: '#11157a',
                backgroundColor: '#f9f9f9',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#e6e6e6')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#f9f9f9')}
            >
              {option.name}
            </div>
          )}
        />
            </div>
            <div class="form-group search-info">
              <input
                type="text"
                class="form-control mm-border"
                placeholder="Search Doctors, Clinics, Hospitals, Diseases Etc"
              />
            </div>
            <button type="submit" class="btn btn-primary search-btn sh-btn">
            <img src={search} class="img-fluid" alt="search" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
