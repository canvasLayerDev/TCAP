<?php
defined('BASEPATH') OR exit('No direct script access allowed');
 
$active_group = 'default';
$query_builder = TRUE;

$db['default'] = array(
	'dsn'	=> '',
	'hostname' => getenv('DB_HOST') ?: 'localhost',
// 	'username' => 'u555641943_demo',
// 	'password' => 'V1GRrL9o',
// 	'database' => 'u555641943_demo',

//new db
	'username' => getenv('DB_USER') ?: 'u555641943_tcap',
	'password' => getenv('DB_PASS') ?: '|n1fPt@jF',
	'database' => getenv('DB_NAME') ?: 'u555641943_tcap',


	'dbdriver' => 'mysqli',
	'dbprefix' => '',
	'pconnect' => FALSE,
	'db_debug' => (ENVIRONMENT !== 'production'),
	'cache_on' => FALSE,
	'cachedir' => '',
	'char_set' => 'utf8',
	'dbcollat' => 'utf8_general_ci',
	'swap_pre' => '',
	'encrypt' => FALSE,
	'compress' => FALSE,
	'stricton' => FALSE,
	'failover' => array(),
	'save_queries' => TRUE
);
