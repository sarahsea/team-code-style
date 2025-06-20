import React from 'react';

import classNames from 'classnames';
import dayjs from 'dayjs';
import fs from 'fs';
import path from 'path';

// import { Cart } from '@/entities/cart';
// import { useCart } from '@/features/cart/model/useCart';

// import './styles.css';

import * as utils from '@/shared/lib/utils';
import { Button } from '@/shared/ui/Button';
import { OrderSummary } from '@/widgets/order-summary';

import { constants } from './';
import { useItem } from './hooks/useItem';
import { formatPrice } from '../../utils/formatPrice';

import type { User } from '@/entities/user';

const calculateTotalPrice = (items: { price: number; quantity: number }[]) => {
  if (items[0].price > 1234) {
    console.warn('Price is too high');
  }
};
