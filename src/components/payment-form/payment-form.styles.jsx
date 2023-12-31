import styled from "styled-components";
import Button from "../button/button.component";

export const PaymentFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  background: rgb(247,250,252);
  width: 100%;
  padding: 20px;
  border: 1px solid #e5e1e1;
  margin: 22px 0;
  height: 220px;
`;

export const FormContainer = styled.form`
  height: 100px;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 30px;
`;

export const PaymentButton = styled(Button)`
  font-size: 16px;
`;