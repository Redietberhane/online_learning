import { useEffect, useState } from "react";
import { Link, Outlet, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import withAuth from "../utils/withAuth";

const LearningPage = () => {
  const [selectedSection, setSelectedSection] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState({});
  const [sectionList, setSectionList] = useState([]);
  const [completed, setCompleted] = useState([]);
  useEffect(() => {
    axios
      .get(`/sections/getCourseSections/${id}`)
      .then((res) => {
        // console.log(res.data);
        // setCourse(res.data[0]);
        setSectionList(res.data);
      })
      .catch((error) => {
        console.log(error.response.data.message);
        // navigate("/");
      });
    fetchCompleted();
    axios
      .get("/courses/getSingleCourse", { params: { courseID: id } })
      .then((res) => {
        // console.log(res.data);
        setCourse(res.data[0]);
      })
      .catch((error) => {
        console.log(error.response.data.message);
        // navigate("/");
      });
  }, []);
  const [activeSection, setActiveSection] = useState(null);

  const toggleSection = (sectionId) => {
    setActiveSection((prevSection) =>
      prevSection === sectionId ? sectionId : sectionId
    );
  };
  const fetchCompleted = () => {
    axios
    .get(`/sections/getCompleteSections/${id}`)
    .then((res) => {
      // console.log(res.data.filter((grade) => grade.completed === 1).map((grade) => grade.grade_id));
      // setCourse(res.data[0]);
      setCompleted(
        res.data
          .filter((grade) => grade.completed === 1)
          .map((grade) => grade.section_id)
      );
    })
    .catch((error) => {
      console.log(error.response.data.message);
      // navigate("/");
    });
  }

  const handleSectionClick = (section) => {
    if (selectedSection === section) {
      setSelectedSection(null);
    } else {
      setSelectedSection(section);
    }
  };
  const handlePrevSection = () => {
    const currentIndex = sectionList.findIndex(
      (section) => section.section_id === activeSection
    );
    if (currentIndex > 0) {
      navigate(
        `/learning/${id}/${sectionList[currentIndex - 1].section_type}/${
          sectionList[currentIndex - 1].section_id
        }`
      );
      setActiveSection(sectionList[currentIndex - 1].section_id);
    }
  };

  const handleNextSection = () => {
    const currentIndex = sectionList.findIndex(
      (section) => section.section_id === activeSection
    );
    if (currentIndex < sectionList.length - 1) {
      navigate(
        `/learning/${id}/${sectionList[currentIndex + 1].section_type}/${
          sectionList[currentIndex + 1].section_id
        }`
      );
      setActiveSection(sectionList[currentIndex + 1].section_id);
    }
  };
  const isFirstSection = activeSection === sectionList[0]?.section_id;
  const isLastSection =
    activeSection === sectionList[sectionList.length - 1]?.section_id;

  return (
    <div className="">
      {/* Sections  */}
      <div className="flex my-4 flex-wrap">
        {/* Left side content */}
        <div className="lg:w-3/4 w-full p-4 h-full">
          <div className="bg-gray-100 p-4 h-full">
            {/* Content goes here */}
            <Outlet
              context={{
                isFirstSection,
                isLastSection,
                completed,
                handlePrevSection,
                handleNextSection,
                fetchCompleted,
              }}
            />
          </div>
        </div>
        {/* Right side sections */}
        <div className="lg:w-1/4 w-full p-4">
          <div>
            <h3 className="text-lg font-semibold mb-4">Sections</h3>
            <ul>
              {sectionList.map((section) => (
                <li key={section.section_id} className=" mb-4">
                  <div
                    className=""
                    onClick={() => toggleSection(section.section_id)}>
                    <div
                      className={` rounded-lg shadow-sm py-2 px-5  ${
                        activeSection === section.section_id
                          ? "border border-dark-purple"
                          : ""
                      }  flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-0`}>
                      <div className="flex flex-col sm:flex-row justify-start items-center gap-4">
                        <div className="flex p-2 rounded-md">
                          <input
                            type="checkbox"
                            checked={completed.includes(section.section_id)}
                            onChange={() => {}}
                            className="form-checkbox h-5 w-5 text-dark-purple bg-dark-purple"
                          />
                          {/* 
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 text-emerald-500"
                            viewBox="0 0 20 20"
                            fill="currentColor">
                            <path
                              fillRule="evenodd"
                              d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                              clipRule="evenodd"></path>
                          </svg> */}
                        </div>
                        <Link
                          to={`/learning/${id}/${section.section_type}/${section.section_id}`}>
                          <div className="text-center sm:text-left cursor-pointer">
                            <h1
                              className={`${
                                activeSection === section.section_id
                                  ? "text-dark-purple font-bold"
                                  : ""
                              }   tracking-wider line-clamp-1`}>
                              {section.section_title}
                            </h1>
                            <p className="text-sm text-slate-400">
                              {section.section_type}
                            </p>
                          </div>
                        </Link>
                      </div>
                      {/* <div>
                        <svg
                          className={`w-6 h-6 transition-transform transform ${
                            activeSection === section.section_id
                              ? "rotate-180"
                              : "rotate-0"
                          }`}
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24">
                          <path
                            className="fill-current text-dark-purple"
                            d="M19.293 8.293l-7 7a1 1 0 0 1-1.414 0l-7-7A1 1 0 0 1 5.293 6.707L12 13.414l6.707-6.707a1 1 0 1 1 1.414 1.414z"
                          />
                        </svg>
                      </div> */}
                    </div>
                  </div>
                  {/* {activeSection === section.section_id && (
                    <div className="ml-4 mt-2">
                      <p>{section.section_description}</p>
                    </div>
                  )} */}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      {/* Course Details  */}
      <div className="m-4 rounded-lg bg-white py-2 px-4">
        {/* <h1 className="text-2xl font-bold mb-2">About this Course</h1> */}
        <div className="p-4 mb-4 flex">
          <div className="w-3/4">
            <h1 className="text-2xl font-bold mb-2">{course?.course_title}</h1>
            <p className="text-gray-600 mb-2">{course?.course_details}</p>
          </div>
          <div className="w-1/4">
            <div className="flex items-center mb-2 gap-4">
              <p className="text-gray-600 items-center">Rating</p>
              <div>
                <span className="text-yellow-500 mr-1">&#9733;</span>
                <span className="text-gray-600">{course?.course_rating}</span>
              </div>
            </div>
            <p className="text-gray-600 mb-2">
              Instructor: {course?.course_instructor}
            </p>

            <p className="text-gray-600 mb-2">
              {course?.course_students} students
            </p>
            <p className="text-gray-600 mb-2">
              {course?.course_total_hour} total hours
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withAuth(LearningPage);
