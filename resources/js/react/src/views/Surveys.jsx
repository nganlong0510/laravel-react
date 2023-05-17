import { PlusCircleIcon } from "@heroicons/react/24/outline";
import PageComponent from "../components/Page/PageComponent";
import Button from "../components/component/Button";
import SurveyListItem from "../components/surveys/SurveyListItem";
import { useStateContext } from "../contexts/ContextProvider";

export default function Surveys() {
  const { surveys } = useStateContext();
  console.log(surveys);

  const onDeleteClick = () => {
    console.log("Click Delete");
  };

  return (
    <PageComponent
      title="Surveys"
      buttons={
        <Button color="green" to="/surveys/create">
          <PlusCircleIcon className="h-6 w-6 mr-2" />
          Create new
        </Button>
      }
    >
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
        {surveys.map((survey) => (
          <SurveyListItem
            survey={survey}
            key={survey.id}
            onDeleteClick={onDeleteClick}
          />
        ))}
      </div>
    </PageComponent>
  );
}
