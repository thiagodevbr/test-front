/* eslint-disable */
import React, { useContext, useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '../../components/Button'
import { HeaderNav } from '../../components/HeaderNav'
import { Heading } from '../../components/Heading'
import { Product } from '../../components/Product'
import { TotalPriceModule } from '../../components/TotalPriceModule'
import { CheckoutContext } from '../../contexts/CheckoutContext'
import api from '../../services/api'

import * as S from './styles'

export const Checkout: React.FC = () => {
  const { handleProduct, product } = useContext(CheckoutContext)

  useEffect(() => {
    api.get('').then(data => handleProduct?.(data.data))
  }, [handleProduct])

  const totalPrice = useMemo(() => {
    if (product) {
      return product?.shippingTotal + product?.subTotal - product?.discount
    }
  }, [product])

  return (
    <S.Wrapper>
      <HeaderNav page="checkout" />
      <S.Content>
        <Heading title="produtos" />
        <S.BlockContent>
          <S.Products>
            {product &&
              product.items.map(item => (
                <Product
                  key={item.product.sku}
                  image={item.product.imageObjects[0].small}
                  description={item.product.name}
                  price={item.product.priceSpecification.originalPrice}
                />
              ))}
          </S.Products>
          <S.BlockPrice>
            <S.Price>
              {product && totalPrice && (
                <TotalPriceModule
                  discount={product?.discount}
                  freightage={product?.shippingTotal}
                  products={product?.subTotal}
                  total={totalPrice}
                />
              )}
            </S.Price>
            <S.Button>
              <Link to="/payment">
                <Button text="seguir para o pagamento" />
              </Link>
            </S.Button>
          </S.BlockPrice>
        </S.BlockContent>
      </S.Content>
    </S.Wrapper>
  )
}
