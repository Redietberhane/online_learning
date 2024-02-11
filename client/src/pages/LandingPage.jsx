import React, { useEffect, useState } from "react";
import LandingHero from "../components/LandingHero";
import OurGoal from "../components/OurGoal";
import CoursesList from "../components/TopCourseList";
import Mentor from "../components/Mentor";
import axios from "axios";
// import CoursesHero from "../components/CoursesHero";

// import Explore from "../components/Explore";
// import { useNavigate } from "react-router-dom";

function LandingPage() {
  // const navigate = useNavigate();
  const [webContent, setWebContent] = useState({});
  useEffect(() => {
    axios
      .get("/webcontent/getContent")
      .then((response) => {
        // console.log(response.data);
        setWebContent({ ...response.data[0] });
      })
      .catch((error) => {
        console.log(error.response.data.message);
      });
  }, []);
  return (
    <>
      <LandingHero
        hero_title={webContent.hero_title}
        hero_detail={webContent.hero_detail}
      />
      <OurGoal
        goal_title={webContent.goal_title}
        goal_detail={webContent.goal_detail}
      />
      <CoursesList
        lesson_title={webContent.lesson_title}
        lesson_details={webContent.lesson_detail}
      />
      <Mentor
        mentor_title={webContent.mentor_title}
        mentor_detail={webContent.mentor_detail}
      />
      {/* <Explore /> */}
    </>
  );
}

export default LandingPage;
