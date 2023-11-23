/* eslint-disable react/prop-types */
const Card = ({ image, title }) => {
  return (
    <div className="flex justify-center items-start w-[6rem] sm:w-[6rem] mr-5">
      <img className="" src={image} alt={title} title={title} />
    </div>
  );
};

export default Card;
