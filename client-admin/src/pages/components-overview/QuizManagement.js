import { Outlet } from "../../../node_modules/react-router/dist/index";
import ComponentSkeleton from "./ComponentSkeleton";

export default function QuizManagement() {
  return (
    <>
      <ComponentSkeleton>
        <Outlet />
      </ComponentSkeleton>
    </>
  );
}
