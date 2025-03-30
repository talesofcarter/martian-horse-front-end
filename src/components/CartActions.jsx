// components/CartActions.jsx
import { useContext, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { FiTrash2 } from "react-icons/fi";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";
import ConfirmationModal from "./ConfirmationModal";

const CartActions = () => {
  const { cartItems, clearCart } = useContext(ShopContext);
  const [isClearing, setIsClearing] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // Calculate cart count
  const cartCount = Object.keys(cartItems).reduce((total, productId) => {
    const sizes = cartItems[productId];
    return total + Object.values(sizes).reduce((sum, qty) => sum + qty, 0);
  }, 0);

  const handleClearClick = () => {
    if (cartCount === 0) {
      toast.info("Your cart is already empty");
      return;
    }
    setShowModal(true);
  };

  const handleConfirmClear = async () => {
    setIsClearing(true);
    try {
      await clearCart();
    } catch (error) {
      console.error(error);
    } finally {
      setIsClearing(false);
      setShowModal(false);
    }
  };

  if (cartCount === 0) return null;

  return (
    <>
      <div className="flex">
        <button
          onClick={handleClearClick}
          className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-red-600 transition-all cursor-pointer"
          aria-label="Clear shopping cart"
        >
          Clear Cart
        </button>
      </div>

      <ConfirmationModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={handleConfirmClear}
        title="Clear your cart?"
        message="This will remove all items from your cart. Are you sure you want to continue?"
        confirmText={isClearing ? "Clearing..." : "Clear Cart"}
        cancelText="Keep Items"
      />
    </>
  );
};

export default CartActions;
