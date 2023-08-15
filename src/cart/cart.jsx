
import Button from '../button/button';
import { totalPrice } from '../units';
import './cart.css';

const Cart = ({ onCheckout, cartItems }) => {
	return (
		<div className='cart__container'>
			<p className='cart__title'>
				Umumiy narx - {totalPrice(cartItems).toLocaleString('en-US', {
					style: 'currency',
					currency: 'USD',
				})}
			</p>

			<Button
				title={`${cartItems.length === 0 ?'Buyurtam berish':`To'lov` }`}
                disable={cartItems.length === 0 ? true:false}
				type={'checkout'}
				onClick={onCheckout}
			/>
		</div>
	);
};

export default Cart;