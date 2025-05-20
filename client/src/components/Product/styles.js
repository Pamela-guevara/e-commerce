import styled from "styled-components";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";

export const ProductCard = styled(Paper)`
  margin: auto;
  height: 500px;
  width: 800px;
  margin-top: 50px;
  margin-bottom: 20px;
`;
export const ContenedorImg = styled.img`
  float: left;
  height: 500px;
  width: 400px;
}    
`;
export const ProductText = styled.section`
height: 300px;
width: 327px;
float: right;
}    
`;
export const ProductPrice = styled.section`
  margin: auto;
  height: 103px;
  width: 327px;
  position: relative;
`;
export const ContPrecio = styled.section`
  margin: auto;
  position: relative;
  top: -13px;
  height: 50px;
  font-family: "Trocchi", serif;
  font-size: 28px;
  font-weight: lighter;
  color: #474747;
`;
export const Precio = styled.section`
  margin: auto;
  display: inline-block;
  height: 50px;
  font-family: "Suranna", serif;
  font-size: 34px;
`;
export const Descripcion = styled.section`
  height: 75px;
  margin: 20px 20px 0 38px;
  font-family: "Playfair Display", serif;
  color: #464646;
  line-height: 1.7em;
  font-size: 15px;
  font-weight: lighter;
  overflow: hidden;
  text-align: justify;
`;
export const Boton = styled(Button)`
  margin: auto;
  display: inline-block;
  height: 50px;
  width: 176px;

  box-sizing: border-box;
  border: transparent;
  border-radius: 60px;
  font-family: "Raleway", sans-serif;
  font-size: 12px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  color: #ffffff;
  background-color: black;
  cursor: pointer;
  outline: none;
`;

//background-color: ${(props) => props.theme.palette.error.light};
