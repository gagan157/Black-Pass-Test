import { Button } from "components/Atoms/Button/Button";
import { Textfield } from "components/Atoms/Textfield/Textfield";
import React from "react";
import { Modal } from "../Modal";
import { Card } from "components/Atoms/Card/Card";
import { Images } from "assets/Images";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Typography } from "components/Atoms/Typography/Typography";

interface TwitterCommentPopupProps {
  onComment: () => void;
}

const validationSchema = Yup.object({
  message: Yup.string()
    .url("Invalid URL")
    .matches(/^https:\/\/twitter.com\/.*/, " invalid URL")
    .required("Comment URL is required"),
});

export const TwitterCommentPopup = ({
  onComment,
}: TwitterCommentPopupProps) => {
  const formik: any = useFormik({
    initialValues: {
      message: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values: any) => {
      onComment();
    },
  });

  return (
    <Modal blurImg>
      <Card pseudoElement="secondary">
        <form onSubmit={formik.handleSubmit}>
          <Textfield
            placeHolder="Enter Comment URl"
            name="message"
            value={formik.values.message}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`${
              formik.touched.message && formik.errors.message
                ? "!border-red-600"
                : "border-none"
            }`}
          />
          {formik.touched.message && formik.errors.message ? (
            <Typography
              isIcon={false}
              variant="p"
              font="regular"
              className="!text-red-600"
            >
              {formik.errors.message}
            </Typography>
          ) : null}
          <div className="py-2">
            <img src={Images.LINE} alt="line" />
          </div>
          <div className="group hover:drop-shadow-primary w-[155px] mt-1 ">
            <Button
              type="submit"
              color="white"
              isBorder
              isBorderLabel="submit"
              CLASSNAME=" text-text-primary group-hover:text-text-secondary pr-2 mobile:pr-3"
            />
          </div>
        </form>
      </Card>
    </Modal>
  );
};
