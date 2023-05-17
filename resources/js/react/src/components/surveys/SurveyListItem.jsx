import React from "react";
import {
  ArrowTopRightOnSquareIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import Button from "../component/Button";

export default function SurveyListItem({ survey, onDeleteClick }) {
  return (
    <div className="flex flex-col py-4 px-6 shadow-md bg-white hover:bg-gray-50 h-[470px]">
      <img
        src={survey.image_url}
        alt={survey.title}
        className="w-full h-48 object-cover"
      />
      <h4 className="mt-4 text-lg font-bold">{survey.title}</h4>
      <div
        dangerouslySetInnerHTML={{ __html: survey.description }}
        className="overflow-scroll flex-1"
      ></div>

      <div className="flex justify-between items-center mt-3">
        <Button to={`/surveys/${survey.id}`}>
          <PencilIcon className="w-5 h-5 mr-2 " />
          Edit
        </Button>
        <div className="flex items-center">
          <Button href={`/view/survey/${survey.slug}`} circle link>
            <ArrowTopRightOnSquareIcon className="w-5 h-5" />
          </Button>

          {survey.id && (
            <Button
              onClick={(e) => onDeleteClick(survey.id)}
              circle
              link
              color="red"
            >
              <TrashIcon className="w-5 h-5" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}