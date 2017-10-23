/**
 * Created by chao on 2017/10/23.
 */

import React, { Component } from 'react';

import Container from './Container';
import UserTop from './UserTopContainer';
import UserInfoTop from './UserInfoTopContainer';
import PurchaseContainer from './PurchaseContainer';
import UserTitle from '../components/UserTitle';
import PurChaseItem from '../components/PurchaseItem';
import UserEquity from './UserEquity';
import EquityItem from '../components/EquityItem';
import EquityIcon from '../components/EquityIcon';
import EquityText from '../components/EquityText';

export default class User extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render () {
    return (
      <Container background='#fff' marginBottom={0.56}>
        <UserTop>
          <UserInfoTop login={true} />
        </UserTop>
        <PurchaseContainer>
          <UserTitle margin='0.52rem 0 0.18rem 0.24rem'>会员购买</UserTitle>
          <PurChaseItem isRecommend={true} />
          <PurChaseItem />
        </PurchaseContainer>
        <UserEquity>
          <UserTitle margin='0.52rem 0 0.48rem 0.24rem'>会员权益</UserTitle>
          <EquityItem>
            <EquityIcon name='尊享包' />
            <EquityText>
              欢迎使用React Native！这篇文档会帮助你搭建基本的React Native开发环境。如果你已经搭好了环境，那么可以尝试一下编写Hello World。
            </EquityText>
          </EquityItem>
          <EquityItem>
            <EquityIcon name='精选包' />
            <EquityText>
              欢迎使用React Native！这篇文档会帮助你搭建基本的React Native开发环境。如果你已经搭好了环境，那么可以尝试一下编写Hello World。
            </EquityText>
          </EquityItem>
          <EquityItem>
            <EquityIcon name='体验' />
            <EquityText>
              欢迎使用React Native！这篇文档会帮助你搭建基本的React Native开发环境。如果你已经搭好了环境，那么可以尝试一下编写Hello World。
            </EquityText>
          </EquityItem>
        </UserEquity>
      </Container>
    );
  }
};
