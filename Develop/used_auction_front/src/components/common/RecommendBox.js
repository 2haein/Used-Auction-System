import React, { Component, useEffect, useState } from 'react';
import * as auth from '../../api/auth';
import * as stuff from '../../api/stuff';
import styled from "styled-components";

const BigBox = styled.div`
    width : 100%
`

const TitleStyle = styled.h1`

`
const SmallBox = styled.div`
    align-item : center
`

const RecommendBox = ({stuffList, recommendList}) => {
    return (
        <BigBox>
            <div>
                <TitleStyle> 추천목록 </TitleStyle>
                <SmallBox>
                    {stuffList.filter(v => recommendList.includes(v.product_number))
                                .map(v => <SmallBox>{v.product_name}</SmallBox>)}
                </SmallBox>
            </div>
        </BigBox>
    )
}

export default RecommendBox;