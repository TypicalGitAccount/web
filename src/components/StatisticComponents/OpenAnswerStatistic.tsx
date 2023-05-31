import React, { useState, useEffect, useRef } from "react";
import { StatisticComponentProps } from "./interfaces";
import BaseQuestion from "../Questions/BaseQuestion";
import styled from "styled-components";

const StyledStatisticInput = styled.textarea`
  box-sizing: content-box; // We use content-box to exclude padding from width and height
  width: 500px;
  font-size: 18px;
  border: 0;
  border-bottom: 1px solid #ccc;
  resize: none;
  overflow: hidden;
  padding: 0;
  margin: 0;

  &:focus {
    outline: none;
  }
`;

const AutoSizeTextarea = props => {
  const textareaRef = useRef(null);

  useEffect(() => {
    textareaRef.current.style.height = "auto";
    textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
  }, [props.value]);

  return <StyledStatisticInput ref={textareaRef} {...props} />;
};

const OpenAnswerStatistic = (statistic: StatisticComponentProps) => {
  const { data, isAnonymous } = statistic;

  const [isVisible, setIsVisible] = useState(true);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const renderStatistic = () => {
    if (isAnonymous) {
      return data.option_data?.map((item, index) => (
        <AutoSizeTextarea key={index} value={item.answer} readOnly />
      ));
    }

    return data.option_data?.map((item, index) => (
      <ContainerItem key={index}>
        {item.username}
        <AutoSizeTextarea value={item.answer} readOnly />
      </ContainerItem>
    ));
  };

  return (
    <BaseQuestion title={data.question_info.title}>
      <Container>
        <ButtonContainer>
          <StyledButton onClick={toggleVisibility}>
            {isVisible ? "Hide Section" : "Show Section"}
          </StyledButton>
        </ButtonContainer>
        {isVisible && renderStatistic()}
      </Container>
    </BaseQuestion>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  gap: 20px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-bottom: 10px;
`;

const ContainerItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const StyledButton = styled.button`
  background-color: white;
  border: none;
  border-bottom: 1px solid #000;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s;
  outline: none;
  &:hover {
    background-color: rgba(255, 255, 255, 0.8);
  }
`;

export default OpenAnswerStatistic;
