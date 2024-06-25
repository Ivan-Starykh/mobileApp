import React from "react";
import styled from "styled-components/native";
import { connect } from "react-redux";

function mapStateToProps(state) {
  return {
    name: state.name,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    updateName: (name) =>
      dispatch({
        type: "UPDATE_NAME",
        name: name,
      }),
  };
}

class Avatar extends React.Component {
  state = {
    picture:
      "https://drive.google.com/uc?export=download&id=1jKYnNiJQA17smpY6PtRj_njofeg4uwxP",
  };

  componentDidMount() {
    fetch("https://randomuser.me/api/")
      .then((response) => response.json())
      .then((data) => {
        const picture = data.results[0].picture.large;
        const name = data.results[0].name.first;
        this.setState({ picture });
        // this.props.updateName(name);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }

  render() {
    return <Image source={{ uri: this.state.picture }} />;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Avatar);

const Image = styled.Image`
  width: 44px;
  height: 44px;
  border-radius: 22px;
  margin-left: 20px;
`;
