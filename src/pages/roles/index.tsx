import React, {useState} from "react";
import styled from "styled-components";
import loadable from '@loadable/component';

import { ROLES_TYPE } from 'common/variables'

const CheckBox = loadable(() => import('components/roles/CheckBox'))

const Roles: React.FC = () => {
  const [type, setType] = useState<'master' | 'admin' | 'csAdmin' | ''>('');

  const onClickAdminButton = (key: string) => {
    if(key === ROLES_TYPE.MASTER) {
      setType('master')
    }

    if(key === ROLES_TYPE.ADMIN) {
      setType('admin')
    }

    if(key === ROLES_TYPE.CS_ADMIN) {
      setType('csAdmin')
    }
  }

  return (
    <Container>
      <AdminLayout>
        {Object.keys(ROLES_TYPE).map((obj:any,inx:number) => (
          <AdminButton 
            key={`admin-${inx}`}
            onClick={()=>onClickAdminButton(ROLES_TYPE[obj])} 
          >
            {ROLES_TYPE[obj]}
          </AdminButton>
        ))}
      </AdminLayout>

      <MenuLayout>
        {new Array(5).fill(0).map((obj:any,inx:number) => (
        <CheckBox key={`menu-${inx}`} text={`메뉴${inx + 1}`} type={type}/>
        ))}
      </MenuLayout>
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
  margin-bottom: 32px;
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

const MenuLayout = styled.div`
display: flex;
align-items: center;
`

export default Roles;
