--
-- Database: `harisaut_global`
--

-- --------------------------------------------------------

--
-- Table structure for table `idle`
--
USE harisaut_global;
CREATE TABLE `idle` (
  `id` int(11) NOT NULL,
  `idleid` varchar(100) DEFAULT NULL,
  `idledesc` varchar(50) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Dumping data for table `idle`
--

INSERT INTO `idle` (`id`, `idleid`, `idledesc`) VALUES
(8, '1', 'Core box mounting'),
(9, '2', 'MSCB'),
(10, '3', 'No operator'),
(11, '4', 'Maintenance'),
(12, '5', 'No sand'),
(13, '6', 'ok'),
(14, '7', 'Lunch Break');

-- --------------------------------------------------------

--
-- Table structure for table `job`
--

CREATE TABLE `job` (
  `id` int(11) NOT NULL,
  `jobid` varchar(100) DEFAULT NULL,
  `jobname` varchar(100) DEFAULT NULL,
  `jobdesc` varchar(100) DEFAULT NULL,
  `activejob` varchar(10) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Dumping data for table `job`
--

INSERT INTO `job` (`id`, `jobid`, `jobname`, `jobdesc`, `activejob`) VALUES
(126, '7', '377 VCT Inlet/Ex core', '3% sand', '1'),
(127, '8', '5 L lower inlet  core', '4% sand', NULL),
(128, '9', '1.3 riser', 'r1416', NULL),
(140, '11', 'sand', '3% sand', '1');

-- --------------------------------------------------------

--
-- Table structure for table `login`
--

CREATE TABLE `login` (
  `userID` varchar(40) NOT NULL,
  `password` varchar(20) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Dumping data for table `login`
--

INSERT INTO `login` (`userID`, `password`) VALUES
('global', 'global@#');

-- --------------------------------------------------------

--
-- Table structure for table `machine`
--

CREATE TABLE `machine` (
  `id` int(11) NOT NULL,
  `portno` int(11) DEFAULT NULL,
  `name` varchar(200) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Dumping data for table `machine`
--

INSERT INTO `machine` (`id`, `portno`, `name`) VALUES
(1, 26, 'Machine 1'),
(2, 5, 'Machine 4'),
(3, 13, 'Machine 2'),
(4, 6, 'Machine 3'),
(5, 22, 'Machine 5'),
(6, 27, 'Machine 6'),
(7, 17, 'Machine 7');

-- --------------------------------------------------------

CREATE TABLE operator(
`opid` int(11) NOT NULL,
 `opname` varchar(40) DEFAULT NULL
) ENGINE=MyISAM  DEFAULT CHARSET=utf8;

--
-- Table structure for table `machinelog`
--
CREATE TABLE machinestatus(
`srno` int(11) NOT NULL,
 `ioport` int(11) DEFAULT NULL,
 `opid` int(11) DEFAULT NULL,
 `idleid` int(11) DEFAULT NULL,
 `statetime` datetime DEFAULT NULL,
 `status` int(11) DEFAULT NULL
) ENGINE=MyISAM  DEFAULT CHARSET=utf8;
CREATE TABLE `machinelog` (
  `srno` int(11) NOT NULL,
  `start_time` datetime DEFAULT NULL,
  `end_time` datetime DEFAULT NULL,
  `cycletime` int(11) DEFAULT NULL,
  `idletime` int(11) DEFAULT NULL,
  `ioport` int(11) DEFAULT NULL,
  `jobno` int(11) DEFAULT NULL,
  `opid` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

CREATE INDEX machinelog_index
ON machinelog (srno, ioport, jobno, opid);

OPTIMIZE TABLE machinelog;

ALTER TABLE machinelog ENGINE='MyISAM';
ANALYZE TABLE machinelog;
--
-- Dumping data for table `machinelog`
--
INSERT INTO machinestatus(ioport, opid, idleid, status) VALUES(26,);
INSERT INTO machinestatus(ioport, opid, idleid, status) VALUES(5);
INSERT INTO machinestatus(ioport, opid, idleid, status) VALUES(13);
INSERT INTO machinestatus(ioport, opid, idleid, status) VALUES(6);
INSERT INTO machinestatus(ioport, opid, idleid, status) VALUES(22);
INSERT INTO machinestatus(ioport, opid, idleid, status) VALUES(27);
INSERT INTO machinestatus(ioport, opid, idleid, status) VALUES(17);