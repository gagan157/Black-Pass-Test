import { CancleIcon } from "assets";
import React, { useState } from "react";
import { Modal } from "../Modal";
import { Card } from "components/Atoms/Card/Card";
import { Button } from "components/Atoms/Button/Button";
import { Textfield } from "components/Atoms/Textfield/Textfield";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Typography } from "components/Atoms/Typography/Typography";
import { useCustomError } from "hooks/accessTokenExpire";
import { POST_CREATOR_QUEST } from "services/apiService";
import { serialize } from "constants/utils";
import { toast } from "react-toastify";
import { Images } from "assets/Images";

interface CreatorQuestProps {
  onClose: () => void;
  questMission: () => void;
}

export const CreatorQuest = ({ onClose, questMission }: CreatorQuestProps) => {
  const [CreatorQuestResponse, setCreatorQuestResponse] = useState({
    status: "idle",
  });
  const { handleError } = useCustomError();

  const formik = useFormik({
    initialValues: {
      url: "",
    },
    validationSchema: Yup.object({
      url: Yup.string().matches(/^\S*$/, "Links cannot Contain Spaces").url("This URL format is invalid").required("URL is required"),
    }),
    enableReinitialize: true,
    onSubmit: (values) => {
      post_Creator_Quest_Link(values.url);
      console.log(values, "values ::::");
    },
  });

  const post_Creator_Quest_Link = async (link: string) => { 
    try {
      setCreatorQuestResponse({
        status: "pending",
      });
      const res = await POST_CREATOR_QUEST(serialize({ link: link }));
      if (res.status === 201) {
        setCreatorQuestResponse({
          status: "resolved",
        });
        toast.success(res.data?.message);
        questMission();
        onClose();
      }
      console.log(res);
    } catch (err: any) {
      handleError(err);
      setCreatorQuestResponse({
        status: "rejected",
      });
    }
  };

  return (
    <Modal blurImg={true}>
      <Card
        pseudoElement="third"
        fullWidth={true}
        className="!px-5 !max-w-full md:!w-[600px] !w-[350px]"
      >
        <button
          onClick={() => onClose()}
          className="cursor-pointer absolute top-2 right-2"
          disabled={CreatorQuestResponse.status === "pending"}
        >
          <CancleIcon />
        </button>

        <div className="grid place-items-center text-center">
          <Typography
            isIcon={false}
            variant="h3"
            className="text-text-secondary mobile:text-2xl mobile:leading-7 cursor-default uppercase"
          >
            Submit a link for review
          </Typography>
        </div>
        <div className="py-4 flex justify-center items-center">
          <img src={Images.LINE} alt="line" />
        </div>
        <form
          onSubmit={formik.handleSubmit}
          className="mt-2 flex flex-col gap-3 !cursor-default w-full"
        >
          <Textfield
            placeHolder="Enter a URL"
            name="url"
            value={formik.values.url}
            onChange={(e: any) => {
              formik.handleChange(e);
            }}
            onBlur={formik.handleBlur}
            className={`${
              formik.touched.url && formik.errors.url
                ? "!border-red-600"
                : "border-none"
            }`}
          />
          {formik.touched.url && formik.errors.url && (
            <Typography
              isIcon={false}
              variant="p"
              font="regular"
              className="!text-red-600"
            >
              {formik.errors.url}
            </Typography>
          )}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 w-full py-3 ">
            <div className="group hover:drop-shadow-primary w-full px-2">
              <Button
                bgColor={true}
                CLASSNAME="pr-2 text-text-primary group-hover:text-text-secondary"
                className="w-full"
                size="extraSmall"
                color="white"
                isBorderLabel="go to dashboard"
                isBorder={true}
                onClick={() => onClose()}
                disable={CreatorQuestResponse.status === "pending"}
              />
            </div>
            <div className="group hover:drop-shadow-primary w-full px-2">
              <Button
                bgColor={true}
                CLASSNAME="pr-2 text-text-primary group-hover:text-text-secondary"
                className="w-full"
                size="extraSmall"
                color="white"
                isBorderLabel="Submit"
                isBorder={true}
                type="submit"
                disable={CreatorQuestResponse.status === "pending"}
              />
            </div>
          </div>
        </form>
      </Card>
    </Modal>
  );
};
