import React, { useState } from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import MusicList from "../components/MusicList";
import Container from "@material-ui/core/Container";

const MusicTabs = ({ recommendationTracks, tracksWithoutInfluence }) => {
  const [tabIdx, setTabIdx] = useState(0);

  return (
    <Container style={{ height: "100%", padding: 0 }}>
      <AppBar position="static">
        <Tabs
          value={tabIdx}
          onChange={(event, newValue) => setTabIdx(newValue)}
          aria-label="simple tabs example"
        >
          <Tab label="Recomendações por influência social" />
          <Tab label="Recomendações alternativas" />
        </Tabs>
      </AppBar>
      <div style={{ flexGrow: 1 }}>
        {tabIdx === 0 && <MusicList tracks={recommendationTracks} />}
        {tabIdx === 1 && <MusicList tracks={tracksWithoutInfluence} />}
      </div>
    </Container>
  );
};

MusicTabs.propTypes = {
  recommendationTracks: PropTypes.array.isRequired,
  tracksWithoutInfluence: PropTypes.array.isRequired
};

export default MusicTabs;
