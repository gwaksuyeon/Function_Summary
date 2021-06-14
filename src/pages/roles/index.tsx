import React from "react";
import styled from "styled-components";
import { ROLES_TYPE } from "common/variables";

const Roles: React.FC = () => {
  return (
    <Container>
      <AdminLayout>
        {Object.keys(ROLES_TYPE).map((obj: string, inx: number) => (
          <AdminButton key={`rolues-${inx}`}>{obj} </AdminButton>
        ))}
      </AdminLayout>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const AdminLayout = styled.div`
  display: flex;
  align-items: center;
`;

const AdminButton = styled.div`
  border: 1px solid #e9edf1;
  padding: 2px 4px;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    background: #fafafa;
  }

  & ~ & {
    margin-left: 8px;
  }
`;

export default Roles;
