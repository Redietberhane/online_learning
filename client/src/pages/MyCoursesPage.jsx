import MyCoursesHero from "../components/MyCoursesHero";
import MyCourseBody from "../components/MyCourseBody";
import withAuth from "../utils/withAuth";
//import OtherCourses from "../components/OtherCourses";

function MyCoursesPage() {
  return (
    <>
      <MyCoursesHero />
      <MyCourseBody />
      {/* <OtherCourses /> */}
    </>
  );
}

export default withAuth(MyCoursesPage);
