import CheckoutItem from "conponents/checkout-item/checkout-item.component";
import { CheckoutContainer, CheckoutHeader, HeaderBlock, Total } from "./checkout.styles";
import { useSelector } from "react-redux";
import { selectCartItems, selectTotalAmount } from "store/cart/cart.selector";

const Checkout = () => {
	const cartItems = useSelector(selectCartItems);
	const totalAmount = useSelector(selectTotalAmount);

	return (
		<CheckoutContainer>
			<CheckoutHeader>
				<HeaderBlock>
					<span>Product</span>
				</HeaderBlock>
				<HeaderBlock>
					<span>Description</span>
				</HeaderBlock>
				<HeaderBlock>
					<span>Quantity</span>
				</HeaderBlock>
				<HeaderBlock>
					<span>Price</span>
				</HeaderBlock>
				<HeaderBlock>
					<span>Remove</span>
				</HeaderBlock>
			</CheckoutHeader>
			{cartItems.map((cartItem) => (
				<CheckoutItem key={cartItem.id} cartItem={cartItem} />
			))}
			<Total>Total: ${totalAmount}</Total>
		</CheckoutContainer>
	);
};

export default Checkout;
