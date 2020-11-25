import React, { useState } from "react";
import { TabContent, TabPane, Nav, NavItem, NavLink, Button, Row, Col } from 'reactstrap';
import classnames from 'classnames';

const Admin = (props) => {
  const [activeTab, setActiveTab] = useState('1');

  const toggle = tab => {
    if(activeTab !== tab) setActiveTab(tab);
  }

  return (
    <div className="mt-5 pt-5">
      <Nav tabs>
      
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '1' })}
            onClick={() => { toggle('1'); }}
          >
            Users
          </NavLink>
        </NavItem>
      
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '2' })}
            onClick={() => { toggle('2'); }}
          >
            Players
          </NavLink>
        </NavItem>
      
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '3' })}
            onClick={() => { toggle('3'); }}
          >
            Teams
          </NavLink>
        </NavItem>
      
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '4' })}
            onClick={() => { toggle('4'); }}
          >
            Matches
          </NavLink>
        </NavItem>
      
      </Nav>
      
      <TabContent activeTab={activeTab}>
      
        <TabPane tabId="1">
          <Row>
            <Col sm="12">
              <h4>User Contents</h4>
            </Col>
          </Row>
        </TabPane>
      
        <TabPane tabId="2">
          <Row>
            <Col sm="12">
              <h4>Player Contents</h4>
            </Col>
          </Row>
        </TabPane>
      
        <TabPane tabId="3">
          <Row>
            <Col sm="12">
              <h4>Team Contents</h4>
            </Col>
          </Row>
        </TabPane>
      
        <TabPane tabId="4">
          <Row>
            <Col sm="12">
              <h4>Match Contents</h4>
            </Col>
          </Row>
        </TabPane>
      
      </TabContent>
    </div>
  );
}

export default Admin;