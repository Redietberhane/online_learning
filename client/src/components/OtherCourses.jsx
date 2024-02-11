function OtherCourses() {
  const courses = [
    { title: "Ha Geez", image: require("../assets/Cardphoto.png") },
    { title: "Hu Cabe", image: require("../assets/Cardphoto2.png") },
    { title: "Hei Seles", image: require("../assets/Cardphoto3.png") },
    { title: "Ho Rabe", image: require("../assets/Cardphoto4.png") },
    { title: "He Hames", image: require("../assets/Cardphoto5.png") },
    { title: "He Sades", image: require("../assets/Cardphoto6.png") },
    { title: "Ho Sabe", image: require("../assets/Cardphoto7.png") },
    { title: "Anbabi", image: require("../assets/Cardphoto8.png") },
    { title: "Keltafa", image: require("../assets/Cardphoto9.png") },
    { title: "Mihur", image: require("../assets/Cardphoto10.png") },
  ];

  return (
    <div className="my-16">
      <div>
        <h3 className="font-bold text-3xl text-center text-[#0A033C] mb-8">
          Other Courses for Beginners
        </h3>
        <div className="flex gap-8 justify-between flex-wrap sm:flex-nowrap mx-8">
          {/* search  */}
          <div className="flex items-center basis-3/4">
            <input
              type="text"
              className="w-full rounded-lg border border-gray-400 p-2"
              placeholder="Search ..."
            />
            <button className="ml-2 rounded-lg bg-dark-purple p-2 text-white hover:bg-blue-600">
              Search
            </button>
          </div>
          {/* sort  */}
          <div className="flex basis-1/4 items-center">
            <label htmlFor="sort" className="mr-2">
              Sort
            </label>
            <select name="sort" id="sort" className="rounded-md p-2 w-full">
              <option value="a">Latest</option>
              <option value="b">Oldest</option>
              <option value="c">c</option>
            </select>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-4 mx-8 my-4">
        {courses.map((item, index) => (
          <div key={index} className="flex flex-col bg-white my-2">
            <a
              href="  /coursedetails"
              className="w-full border-2 border-b-4 border-gray-200 rounded-xl hover:bg-gray-50"
            >
              <div className="grid grid-cols-6 p-5 gap-y-2">
                <div className="w-full border-2 border-b-4 border-gray-200 rounded-xl hover:bg-gray-50">
                  <div className="grid grid-cols-6 p-5 gap-y-2">
                    {/* <!-- Profile Picture --> */}
                    <div>
                      <img
                        src={item.image}
                        className="max-w-20 max-h-20 rounded-lg"
                        alt="kd"
                      />
                    </div>
                  </div>
                </div>

                {/* <!-- Description --> */}
                <div className="col-span-5 md:col-span-4 ml-4">
                  <p className="text-gray-600 font-bold">{item.title} </p>

                  <div className="flex items-center w-16">
                    <svg
                      className="w-5 h-5 text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                    <svg
                      className="w-5 h-5 text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                    <svg
                      className="w-5 h-5 text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                    <svg
                      className="w-5 h-5 text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                    <svg
                      className="w-5 h-5 text-gray-300 dark:text-gray-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                  </div>
                </div>

                {/* <!-- Price --> */}
                <div className="flex col-start-2 ml-4 md:col-start-auto md:ml-0 md:justify-end">
                  <p className="rounded-lg text-red-500 font-bold bg-red-100  py-1 px-3 text-sm w-fit h-fit">
                    {" "}
                    $40.00{" "}
                  </p>
                </div>
              </div>
            </a>
          </div>
        ))}
      </div>
      {/* <div className="w-full mx-auto flex justify-center items-center gap-4 mb-3">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 19.5L8.25 12l7.5-7.5"
          />
        </svg>
        <p className="text-lg items-center text-violet-500">1 of 20</p>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.25 4.5l7.5 7.5-7.5 7.5"
          />
        </svg>
      </div> */}
    </div>
  );
}

export default OtherCourses;
