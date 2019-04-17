import React, { CSSProperties, useState } from 'react';
import classNames from 'classnames';
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Card,
  Button,
  CardTitle,
  CardText,
  Row,
  Col
} from 'reactstrap';

enum Tab {
  FoodItemsList = 'FoodItemsList',
  CreateFoodItem = 'CreateFoodItem'
}

export default function FoodItemsList() {
  const [activeTab, setActiveTab] = useState<Tab>(Tab.FoodItemsList);

  const toggleTab = (tab: Tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };

  const pointerStyling: CSSProperties = { cursor: 'pointer' };

  return (
    <>
      <Nav tabs className='justify-content-center'>
        <NavItem style={pointerStyling}>
          <NavLink
            className={classNames({ active: activeTab === Tab.FoodItemsList })}
            onClick={() => toggleTab(Tab.FoodItemsList)}
          >
            Food Items List
            </NavLink>
        </NavItem>
        <NavItem style={pointerStyling}>
          <NavLink
            className={classNames({ active: activeTab === Tab.CreateFoodItem })}
            onClick={() => toggleTab(Tab.CreateFoodItem)}
          >
            Create Food Item
            </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={activeTab}>
        <TabPane tabId={`${Tab.FoodItemsList}`}>
          <Row>
            <Col sm="12">
              <h4>Food Items List Contents</h4>
            </Col>
          </Row>
        </TabPane>
        <TabPane tabId={`${Tab.CreateFoodItem}`}>
          <Row>
            <Col sm="6">
              <Card body>
                <CardTitle>Special Title Treatment</CardTitle>
                <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                <Button>Go somewhere</Button>
              </Card>
            </Col>
            <Col sm="6">
              <Card body>
                <CardTitle>Special Title Treatment</CardTitle>
                <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                <Button>Go somewhere</Button>
              </Card>
            </Col>
          </Row>
        </TabPane>
      </TabContent>
    </>
  );
}