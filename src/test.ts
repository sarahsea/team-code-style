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
