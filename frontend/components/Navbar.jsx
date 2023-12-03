"use client";
import { userAtom } from "@/atoms/userAtom";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import { useRecoilValue, useSetRecoilState } from "recoil";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const user = useRecoilValue(userAtom);

  const setUser = useSetRecoilState(userAtom);

  const router = useRouter();

  const logoutHandler = async () => {
    try {
      const logout = await fetch("http://localhost:5000/api/users/logout", {
        method: "POST",
      });

      const res = await logout.json();

      if (user) {
        window.localStorage.removeItem("token");
        setUser(null);
        toast.success("Logout successful");
        router.push("/");
      }
    } catch (error) {
      toast.error("An error occurred during logout. Please try again.");
    }
  };

  return (
    <header className="text-black w-full rounded-lg shadow-md">
      <div className="flex h-20 justify-between items-center pl-5 pr-5">
        <div
          className="img hover:scale-110 transition-all"
          onClick={toggleMenu}
        >
          <Link href="/">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="60"
              height="60"
              viewBox="0 0 48 48"
            >
              <path
                fill="#d6e5e5"
                d="M4.238,9.915c0,5,0.064,3.611,0.069,8.11c0.004,3.752,0.362,6.202,0.209,8.892	c-0.127,2.228-0.438,4.42-0.291,6.647c0.2,3.044-1.134,7.326,1.663,9.489c1.768,1.367,4.792,1.236,6.964,1.344	s6.439-0.18,8.601-0.416c5.605-0.611,9.159-0.358,14.793-0.13c2.056,0.083,4.888,0.352,6.492-0.935	c1.545-1.24,2.06-3.227,2.017-6.598c-0.057-4.447-0.134-7.87-0.111-12.317c0.009-1.699,0.098-3.553,0.106-5.253	c0.007-1.371,0.215-4.453,0.193-5.824c-0.02-1.275-0.099-4.203-0.205-5.508c-0.106-1.305-1.108-2.747-2.286-3.32	c-0.502-0.245-1.067-0.315-1.611-0.444c-1.02-0.242-7.57,0.211-8.104,0.264c-5,0.5-5,0-10,0c-1.388,0-3.712-0.323-6.362-0.335	c-3.513-0.016-5.052-0.001-7.138,0.335C6.236,4.399,4.045,6.007,4.238,9.915"
              ></path>
              <path
                fill="#010101"
                d="M13.936,44.919c-0.408,0-0.782-0.007-1.108-0.023c-0.316-0.016-0.651-0.025-0.998-0.037	c-2.054-0.064-4.61-0.145-6.247-1.41c-2.26-1.747-2.077-4.684-1.916-7.275c0.057-0.923,0.111-1.795,0.06-2.575	c-0.107-1.625,0.024-3.244,0.151-4.81c0.052-0.631,0.103-1.264,0.14-1.899c0.083-1.465,0.013-2.854-0.069-4.462	c-0.065-1.273-0.139-2.717-0.141-4.4c-0.002-2.16-0.018-2.96-0.033-3.764c-0.018-0.87-0.035-1.745-0.035-4.335	c-0.18-3.709,1.645-5.897,5.42-6.506c2.166-0.35,3.78-0.354,7.221-0.342c1.535,0.008,2.985,0.119,4.151,0.209	c0.877,0.067,1.634,0.126,2.208,0.126c1.925,0,3.096,0.072,4.129,0.136c1.609,0.1,2.771,0.171,5.821-0.133	c0.066-0.007,7.089-0.533,8.27-0.253c0.132,0.031,0.265,0.059,0.398,0.087c0.435,0.09,0.883,0.184,1.315,0.395	c1.342,0.653,2.444,2.256,2.564,3.728c0.11,1.345,0.188,4.368,0.207,5.542c0.012,0.771-0.046,2.049-0.103,3.285	c-0.044,0.987-0.088,1.938-0.091,2.549c-0.005,0.853-0.029,1.745-0.054,2.638c-0.024,0.884-0.049,1.769-0.053,2.615	c-0.018,3.391,0.022,6.129,0.069,9.299l0.042,3.009c0.047,3.675-0.592,5.701-2.204,6.994c-1.607,1.291-4.186,1.171-6.257,1.071	l-2.3-0.099c-4.654-0.199-8.018-0.341-12.987,0.2C19.601,44.686,16.235,44.919,13.936,44.919z M14.879,4.076	c-2.409,0-3.808,0.05-5.562,0.332c-3.238,0.522-4.736,2.316-4.58,5.482l0.001,0.024c0,2.588,0.018,3.461,0.034,4.327	c0.017,0.809,0.032,1.612,0.034,3.783c0.002,1.658,0.074,3.089,0.139,4.35c0.084,1.638,0.156,3.052,0.069,4.57	c-0.037,0.645-0.089,1.285-0.141,1.924c-0.13,1.6-0.253,3.111-0.15,4.662c0.056,0.846-0.001,1.748-0.06,2.704	c-0.153,2.458-0.311,4.999,1.529,6.422c1.381,1.067,3.758,1.142,5.667,1.202c0.353,0.011,0.693,0.021,1.016,0.038	c2.115,0.104,6.311-0.174,8.522-0.414c5.047-0.55,8.439-0.404,13.139-0.205l2.304,0.099c1.903,0.09,4.271,0.202,5.584-0.852	c1.343-1.077,1.872-2.873,1.83-6.201l-0.042-3.008c-0.047-3.176-0.087-5.918-0.069-9.319c0.005-0.853,0.029-1.745,0.054-2.638	c0.024-0.884,0.049-1.769,0.053-2.615c0.003-0.619,0.047-1.586,0.092-2.588c0.056-1.222,0.113-2.484,0.102-3.225	c-0.019-1.163-0.096-4.156-0.203-5.476c-0.093-1.13-0.974-2.408-2.007-2.911c-0.32-0.156-0.689-0.232-1.08-0.314	c-0.144-0.029-0.286-0.06-0.427-0.093c-0.883-0.211-7.168,0.198-7.939,0.275c-3.127,0.311-4.326,0.238-5.981,0.137	c-1.019-0.063-2.173-0.135-4.067-0.135c-0.612,0-1.388-0.06-2.285-0.129c-1.209-0.093-2.58-0.199-4.078-0.206	C15.833,4.078,15.338,4.076,14.879,4.076z"
              ></path>
              <path
                fill="#16b7b8"
                d="M12.681,11.16c-0.503,0.027-1.05,0.072-1.418,0.416c-0.329,0.308-0.572,0.696-0.649,1.14	c-0.063,0.361,0.022,0.832,0.17,1.167c0.08,0.181,0.215,0.333,0.36,0.469c0.58,0.54,1.455,0.847,2.182,0.532	c0.396-0.172,0.644-0.322,0.934-0.642c0.122-0.135,0.3-0.453,0.379-0.617c0.09-0.189,0.116-0.402,0.12-0.611	c0.009-0.502-0.112-0.846-0.439-1.227C13.992,11.406,13.271,11.19,12.681,11.16"
              ></path>
              <path
                fill="#ed2224"
                d="M12.976,22.755c-0.527-0.033-1.111-0.048-1.516,0.291c-0.118,0.099-0.212,0.222-0.292,0.353	c-0.313,0.511-0.409,1.158-0.228,1.729c0.181,0.571,0.646,1.052,1.22,1.225c0.574,0.173,1.242,0.019,1.662-0.409	c0.163-0.165,0.287-0.365,0.401-0.567c0.122-0.217,0.24-0.442,0.284-0.687C14.719,23.52,13.724,22.844,12.976,22.755"
              ></path>
              <path
                fill="#febf10"
                d="M13.552,34.218c-0.685-0.204-0.685-0.204-1.162-0.167c-0.361,0.027-0.693,0.192-0.922,0.472	c-0.69,0.844-0.496,1.853-0.453,2.02c0.079,0.31,0.317,0.55,0.552,0.767c0.284,0.262,0.684,0.325,1.07,0.307	c1.175-0.056,1.721-0.629,1.905-1.478c0.047-0.215-0.087-1-0.204-1.187C14.08,34.539,13.689,34.305,13.552,34.218"
              ></path>
              <path
                fill="#010101"
                d="M12.688,15.511c-0.649,0-1.331-0.276-1.886-0.793c-0.145-0.136-0.35-0.348-0.476-0.633	c-0.201-0.452-0.281-1.024-0.205-1.456c0.091-0.523,0.367-1.015,0.799-1.418c0.519-0.484,1.249-0.523,1.732-0.55l0.026-0.002	l0.026,0.002c0.63,0.032,1.528,0.261,1.992,0.799c0.405,0.469,0.572,0.937,0.561,1.562c-0.004,0.208-0.025,0.519-0.17,0.817	c-0.064,0.135-0.273,0.532-0.459,0.736c-0.354,0.394-0.674,0.578-1.104,0.766C13.263,15.455,12.979,15.511,12.688,15.511z M12.681,11.661c-0.438,0.024-0.849,0.067-1.077,0.28c-0.188,0.177-0.429,0.47-0.497,0.86c-0.042,0.238,0.015,0.607,0.135,0.879	c0.04,0.09,0.118,0.188,0.245,0.307c0.418,0.39,1.092,0.677,1.641,0.437c0.374-0.162,0.545-0.278,0.762-0.519	c0.063-0.07,0.215-0.321,0.299-0.498c0.046-0.094,0.068-0.222,0.071-0.404c0.008-0.382-0.072-0.606-0.317-0.89	C13.745,11.886,13.207,11.693,12.681,11.661z"
              ></path>
              <path
                fill="#010101"
                d="M12.558,17.246c-0.396,0-0.815-0.036-1.259-0.108c-0.696-0.113-1.696-0.356-2.342-1.146	C8.485,15.416,8.24,14.61,8.209,13.53c-0.027-0.954,0.104-1.789,0.393-2.48c0.362-0.87,1.04-1.565,1.813-1.859	c0.403-0.153,1.926-0.618,2.612-0.618c0.016,0,0.03,0,0.044,0l0.03,0.002c1.065,0.099,1.504,0.386,2.229,0.861l0.316,0.205	c1.154,0.741,1.87,2.394,1.594,3.683c-0.085,0.397-0.252,0.752-0.42,1.076c-0.336,0.649-0.815,1.468-1.555,2.03	C14.554,16.974,13.646,17.246,12.558,17.246z M13.019,9.571c-0.427,0-1.757,0.367-2.248,0.554c-0.513,0.195-0.99,0.697-1.245,1.31	c-0.233,0.56-0.34,1.255-0.316,2.066c0.024,0.852,0.195,1.459,0.521,1.858c0.333,0.406,0.866,0.65,1.73,0.792	c1.375,0.225,2.454,0.051,3.2-0.517c0.579-0.441,0.984-1.138,1.271-1.694c0.157-0.304,0.273-0.56,0.33-0.826	c0.19-0.885-0.351-2.115-1.156-2.632l-0.322-0.21c-0.672-0.44-0.953-0.624-1.758-0.701C13.024,9.571,13.021,9.571,13.019,9.571z"
              ></path>
              <path
                fill="#010101"
                d="M12.644,26.924c-0.21,0-0.421-0.029-0.627-0.092c-0.724-0.218-1.318-0.812-1.554-1.552	c-0.221-0.698-0.116-1.498,0.279-2.143c0.118-0.194,0.248-0.349,0.396-0.474c0.583-0.488,1.391-0.438,1.868-0.408l0.029,0.003	c0.625,0.075,1.242,0.431,1.61,0.929c0.337,0.457,0.46,1.007,0.354,1.592c-0.061,0.327-0.207,0.607-0.341,0.844	c-0.121,0.215-0.272,0.462-0.481,0.673C13.778,26.702,13.217,26.924,12.644,26.924z M12.559,23.239c-0.312,0-0.597,0.039-0.777,0.19	c-0.063,0.054-0.125,0.129-0.187,0.23c-0.246,0.401-0.312,0.894-0.179,1.318c0.135,0.422,0.483,0.774,0.889,0.896	c0.408,0.12,0.875,0.008,1.161-0.281c0.126-0.128,0.229-0.298,0.322-0.462c0.098-0.173,0.196-0.357,0.228-0.531	c0.057-0.31-0.003-0.586-0.175-0.819c-0.231-0.312-0.622-0.489-0.912-0.528C12.805,23.245,12.68,23.239,12.559,23.239z"
              ></path>
              <path
                fill="#010101"
                d="M13.704,28.979c-0.209,0-0.412-0.013-0.604-0.028c-0.893-0.069-2.048-0.218-3.065-0.752	c-1.102-0.578-1.867-1.553-2.05-2.605c-0.133-0.77,0.041-1.529,0.229-2.171c0.199-0.686,0.482-1.47,1.065-2.074	c0.765-0.795,1.937-1.207,3.544-1.163c0.045,0.001,0.088,0.007,0.129,0.019c0.039-0.008,0.069-0.009,0.123-0.013	c1.497,0.028,2.954,1.011,3.712,2.503c0.224,0.44,0.363,0.877,0.415,1.297c0.076,0.624-0.036,1.223-0.156,1.726	c-0.399,1.668-1.191,2.743-2.29,3.11C14.405,28.943,14.047,28.979,13.704,28.979z M12.69,21.184c-1.237,0-2.143,0.288-2.69,0.857	c-0.433,0.449-0.66,1.092-0.826,1.661c-0.155,0.532-0.301,1.151-0.203,1.721c0.13,0.748,0.701,1.455,1.529,1.891	c0.855,0.449,1.881,0.578,2.679,0.641c0.408,0.031,0.872,0.053,1.26-0.076c0.953-0.318,1.415-1.478,1.635-2.395	c0.1-0.417,0.193-0.905,0.137-1.371c-0.038-0.304-0.144-0.629-0.314-0.966c-0.584-1.149-1.725-1.935-2.84-1.956	c-0.044-0.001-0.086-0.008-0.126-0.019c-0.038,0.008-0.08,0.006-0.12,0.013C12.77,21.184,12.729,21.184,12.69,21.184z"
              ></path>
              <path
                fill="#010101"
                d="M12.52,38.12c-0.54,0-0.974-0.149-1.293-0.443c-0.277-0.257-0.584-0.568-0.696-1.01	c-0.035-0.139-0.324-1.39,0.551-2.46c0.314-0.384,0.766-0.616,1.271-0.655c0.572-0.041,0.808-0.05,1.399,0.207l0.01,0.005	c0.248,0.114,0.62,0.364,0.99,0.908c0.332,0.487,0.363,1.126,0.281,1.561c-0.229,1.219-0.983,1.817-2.372,1.884	C12.612,38.119,12.565,38.12,12.52,38.12z M12.799,34.526c-0.077,0-0.165,0.007-0.282,0.016c-0.319,0.024-0.522,0.128-0.662,0.298	c-0.572,0.701-0.357,1.57-0.355,1.578c0.046,0.179,0.226,0.357,0.407,0.524c0.142,0.132,0.377,0.188,0.707,0.176	c1.042-0.051,1.315-0.431,1.437-1.071c0.045-0.237,0.024-0.593-0.125-0.812c-0.259-0.381-0.487-0.518-0.578-0.561	C13.083,34.56,12.967,34.526,12.799,34.526z"
              ></path>
              <path
                fill="#010101"
                d="M12.758,40.106c-0.681,0-1.364-0.1-1.907-0.328c-0.351-0.111-1.16-0.367-1.755-1.139	c-0.616-0.799-0.729-1.747-0.819-2.509l-0.047-0.37c-0.057-0.406-0.057-0.791,0-1.146c0.169-1.042,0.865-1.99,1.862-2.535	c0.869-0.475,1.942-0.639,3.033-0.464c0.897,0.117,2.131,0.79,2.761,1.349c0.667,0.592,1.012,1.297,1.085,2.218	c0.037,0.448-0.074,1.431-0.167,1.834l-0.057,0.25c-0.188,0.83-0.264,1.078-0.929,1.825c-0.215,0.241-0.43,0.417-0.658,0.536	C14.596,39.924,13.679,40.106,12.758,40.106z M12.275,32.548c-0.621,0-1.21,0.14-1.703,0.409c-0.718,0.393-1.237,1.089-1.355,1.817	c-0.04,0.255-0.04,0.541,0.003,0.848l0.049,0.391c0.085,0.705,0.172,1.436,0.619,2.016c0.404,0.524,0.976,0.705,1.219,0.782	l0.134,0.047c1.041,0.439,2.787,0.235,3.455-0.114c0.121-0.064,0.24-0.164,0.375-0.315c0.521-0.586,0.539-0.661,0.701-1.381	l0.058-0.254c0.08-0.351,0.171-1.218,0.146-1.529c-0.053-0.658-0.285-1.136-0.753-1.551c-0.511-0.454-1.574-1.022-2.231-1.105	l-0.018-0.003C12.737,32.566,12.504,32.548,12.275,32.548z"
              ></path>
              <path
                fill="#010101"
                d="M38.034,25.194c-0.036,0-0.073-0.004-0.11-0.013c-1.759-0.399-3.624-0.354-5.423-0.308l-12.115,0.302	c-0.324,0.023-0.506-0.212-0.513-0.487c-0.007-0.276,0.212-0.506,0.487-0.513l12.115-0.302c1.868-0.047,3.792-0.094,5.669,0.333	c0.27,0.061,0.438,0.329,0.377,0.598C38.469,25.037,38.263,25.194,38.034,25.194z"
              ></path>
              <path
                fill="#010101"
                d="M34.09,37.088c-0.437,0-0.87-0.008-1.3-0.015l-12.619-0.21c-0.275-0.005-0.496-0.232-0.491-0.509	c0.005-0.275,0.254-0.483,0.509-0.491l12.618,0.21c1.55,0.024,3.146,0.054,4.665-0.28c0.275-0.057,0.536,0.112,0.596,0.381	c0.06,0.27-0.111,0.536-0.381,0.596C36.49,37.032,35.281,37.088,34.09,37.088z"
              ></path>
              <path
                fill="#010101"
                d="M27.429,13.306c-2.51,0-5.028-0.159-7.512-0.474c-0.274-0.035-0.469-0.285-0.434-0.559	c0.035-0.275,0.298-0.471,0.559-0.434c3.078,0.39,6.21,0.537,9.311,0.434c0.797-0.026,1.595-0.068,2.393-0.111	c2.134-0.113,4.339-0.23,6.518-0.028c0.274,0.025,0.477,0.27,0.451,0.545c-0.025,0.274-0.256,0.469-0.545,0.451	c-2.102-0.195-4.272-0.08-6.371,0.031c-0.804,0.043-1.608,0.085-2.412,0.112C28.734,13.295,28.082,13.306,27.429,13.306z"
              ></path>
            </svg>
          </Link>
        </div>

        {/* Navbar links for medium and larger screens */}
        <nav className="hidden md:flex text-xl">
          <ul className="flex flex-row gap-10">
            <li>
              <Link href="/" className="hover:text-gray-500">
                Home
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-gray-500">
                About
              </Link>
            </li>
            {user && (
              <li>
                <Link href="/dashboard" className="hover:text-gray-500">
                  Dashboard
                </Link>
              </li>
            )}
          </ul>
        </nav>

        {/* Hamburger menu for small screens */}
        <div className="md:hidden cursor-pointer " onClick={toggleMenu}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </div>

        {/* Responsive menu for small screens */}
        {menuOpen && (
          <div className="md:hidden absolute top-20 left-0 w-full text-black bg-white z-10">
            <div className="flex flex-col items-center gap-5 p-5">
              <Link href="/" className="hover:text-gray-200">
                Home
              </Link>
              <Link href="/about" className="hover:text-gray-200">
                About
              </Link>
            </div>
          </div>
        )}

        {/* Auth buttons */}
        {!user ? (
          <div className="hidden md:flex gap-5 ">
            <Link
              href="/login"
              className="p-3 bg-gray-300 rounded-xl hover:bg-gray-400 hover:scale-95"
            >
              Login
            </Link>
            <Link
              href="/signup"
              className="p-3 bg-gray-300 rounded-xl hover:bg-gray-400 hover:scale-95"
            >
              Signup
            </Link>
          </div>
        ) : (
          <div className="hidden md:flex gap-5 ">
            <button
              onClick={logoutHandler}
              className="p-3 bg-gray-300 rounded-xl hover:bg-gray-400 hover:scale-95"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
