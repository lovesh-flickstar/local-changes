// import FlickStarLogo from "../../assets/compressed/logo.png";
import { Link } from 'react-router-dom';

export const MobileNav = () => {
    return (
        <div>
            {/* Top Navigation Bar */}
            <div className="d-flex d-md-none justify-content-between align-items-center py-2 px-3 top-nav">
                {/* <div className="logo-content mb-4 mt-4">
                    <img src={FlickStarLogo} alt="FlickStar Logo" className="logo-img" />
                    <div className="logo-text">FlickStar</div>
                </div> */}
                <div className="d-flex align-items-center">
                    <Link to="/notifications" className="top-nav-icon me-3">
                        <svg className="icon" xmlns="http://www.w3.org/2000/svg" width="30" height="33" viewBox="0 0 30 33" fill="none">
                            <path d="M25.061 22.8335C23.5563 20.8691 22.494 19.8691 22.494 14.4535C22.494 9.49414 20.1198 7.72727 18.1657 6.86914C17.9061 6.75539 17.6618 6.49414 17.5827 6.20977C17.2399 4.96539 16.279 3.86914 15.0016 3.86914C13.7243 3.86914 12.7628 4.96602 12.4235 6.21102C12.3444 6.49852 12.1001 6.75539 11.8405 6.86914C9.88405 7.72852 7.51218 9.48914 7.51218 14.4535C7.50925 19.8691 6.44694 20.8691 4.94226 22.8335C4.31882 23.6473 4.86491 24.8691 5.95534 24.8691H24.0538C25.1384 24.8691 25.6809 23.6435 25.061 22.8335Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M18.75 24.8691V25.8691C18.75 26.93 18.3549 27.9474 17.6516 28.6976C16.9484 29.4477 15.9946 29.8691 15 29.8691C14.0054 29.8691 13.0516 29.4477 12.3483 28.6976C11.6451 27.9474 11.25 26.93 11.25 25.8691V24.8691" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </Link>
                    <Link to="/messages" className="top-nav-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 26 26" fill="none">
                            <path fillRule="evenodd" clipRule="evenodd" d="M14.8739 24.8108L11.6617 17.3194C11.5203 16.9895 11.673 16.6074 12.003 16.4659C12.3329 16.3244 12.715 16.4772 12.8565 16.8071L16.0689 24.299C16.308 24.858 17.1117 24.8247 17.3037 24.2477L24.6627 2.17511C24.8352 1.65759 24.3424 1.16475 23.8248 1.33727L1.75335 8.69344C1.1748 8.88648 1.14145 9.69081 1.7022 9.9311L11.1132 13.9634L21.9318 3.14875C22.1857 2.89498 22.5973 2.89505 22.851 3.14892C23.1048 3.40278 23.1048 3.81432 22.8509 4.06813L11.7208 15.1941C11.5205 15.3943 11.2221 15.4365 10.9804 15.3208L1.19017 11.126C-0.469108 10.4149 -0.370319 8.03172 1.34209 7.46027L23.4138 0.104047C24.9475 -0.407205 26.4072 1.05244 25.896 2.58622L18.537 24.6586C17.9672 26.37 15.5834 26.4689 14.8739 24.8108Z" fill="currentColor" stroke="currentColor" />
                        </svg>
                    </Link>
                </div>
            </div>

            {/* Bottom Navigation Bar */}
            <div className="d-flex d-md-none justify-content-around py-2 bottom-nav">
                <Link to="/" className='mobile-icon'><svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 26 26" fill="none">
                    <path d="M4.33325 10.8335L12.9999 3.25018L21.6666 10.8335V21.6668H16.2499V17.3335C16.2499 16.4716 15.9075 15.6449 15.298 15.0354C14.6885 14.426 13.8618 14.0835 12.9999 14.0835C12.1379 14.0835 11.3113 14.426 10.7018 15.0354C10.0923 15.6449 9.74993 16.4715 9.74993 17.3335V21.6668H4.33326L4.33325 10.8335Z" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                </svg></Link>
                <Link to="/search" className='mobile-icon'><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M20 20.0004L15.8033 15.8037M18 10.5004C18 6.35822 14.6421 3.00037 10.5 3.00037C6.35786 3.00037 3 6.35822 3 10.5004C3 14.6425 6.35786 18.0004 10.5 18.0004C14.6421 18.0004 18 14.6425 18 10.5004Z" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                </svg></Link>
                <Link to="/create" className='mobile-icon'><svg xmlns="http://www.w3.org/2000/svg" width="25" height="26" viewBox="0 0 25 26" fill="none">
                    <path d="M8.6665 13H16.3332" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M12.5 9.16669V16.8334" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M1 13C1 3.52975 3.02975 1.5 12.5 1.5C21.9703 1.5 24 3.52975 24 13C24 22.4703 21.9703 24.5 12.5 24.5C3.02975 24.5 1 22.4703 1 13Z" stroke="currentColor" strokeWidth="1.3" />
                </svg></Link>
                <Link to="/quest" className='mobile-icon'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="24" viewBox="0 0 20 24" fill="none">
                        <path d="M0.913086 23.073V2.00006L10.3359 7.42288" stroke="currentColor" strokeWidth="1.3" />
                        <path d="M0.913086 6.4715L10.2398 11.8467" stroke="currentColor" strokeWidth="1.3" />
                        <path d="M4.90576 20.933V13.2269L8.75183 15.3675V18.6973" stroke="currentColor" strokeWidth="1.3" />
                        <path d="M12.3569 8.19335L18.6981 11.8473L12.3569 15.5013L12.3569 8.19335Z" stroke="currentColor" strokeWidth="1.3" />
                    </svg>
                </Link>
                <Link to="/profile" className='mobile-icon'><svg xmlns="http://www.w3.org/2000/svg" width="22" height="24" viewBox="0 0 22 24" fill="none">
                    <path d="M21 22.5C21 17.228 16.523 12.9545 11 12.9545C5.477 12.9545 1 17.228 1 22.5" stroke="currentColor" strokeWidth="1.3" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M11 12.9546C14.0124 12.9546 16.4545 10.3904 16.4545 7.22729C16.4545 4.0642 14.0124 1.5 11 1.5C7.98749 1.5 5.54541 4.0642 5.54541 7.22729C5.54541 10.3904 7.98749 12.9546 11 12.9546Z" stroke="currentColor" strokeWidth="1.3" strokeMiterlimit="10" strokeLinejoin="round" />
                </svg></Link>
            </div>
        </div>
    );
};
