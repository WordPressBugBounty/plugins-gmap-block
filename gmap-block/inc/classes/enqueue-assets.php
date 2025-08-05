<?php
/**
 * Gmap Blocks Enqueue Assets
 *
 * @package GmapBlock
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if ( ! class_exists( 'Gmap_Block_Assets' ) ) {

	/**
	 * Gmap Blocks Enqueue Assets Class
	 *
	 * @since 1.0.0
	 * @package GmapBlock
	 */

	class Gmap_Block_Assets {

		/**
		 * Constructor
		 *
		 * @since 1.0.0
		 * @return void
		 */
		public function __construct() {
			$this->init();
		}

		/**
		 * Initialize the Class
		 *
		 * @since 1.0.0
		 * @return void
		 */
		private function init() {
			add_action( 'enqueue_block_editor_assets', array( $this, 'enqueue_editor_assets' ), 2 ); // Editor Assets.
		}

		/**
		 * Enqueue Editor Assets
		 *
		 * @since 1.0.0
		 * @return void
		 */
		public function enqueue_editor_assets() {

			// global
			if ( file_exists( trailingslashit( GMAP_PLUGIN_DIR ) . '/build/global/index.asset.php' ) ) {
				$globalDependencies = require_once trailingslashit( GMAP_PLUGIN_DIR ) . '/build/global/index.asset.php';
				wp_enqueue_script(
					'gmap-block-global-script',
					trailingslashit( GMAP_URL_FILE ) . 'build/global/index.js',
					$globalDependencies['dependencies'],
					GMAP_VERSION,
					false
				);
				wp_enqueue_style(
					'gmap-block-global-style',
					trailingslashit( GMAP_URL_FILE ) . 'build/global/index.css',
					array(),
					GMAP_VERSION,
					'all'
				);
			}

			// modules 
			if ( file_exists( trailingslashit( GMAP_PLUGIN_DIR ) . '/build/modules/index.asset.php' ) ) {
				$moduleDependencies = require_once trailingslashit( GMAP_PLUGIN_DIR ) . '/build/modules/index.asset.php';
				wp_enqueue_script(
					'gmap-block-module-script',
					trailingslashit( GMAP_URL_FILE ) . 'build/modules/index.js',
					$moduleDependencies['dependencies'],
					GMAP_VERSION,
					false
				);
			}
		}

	}

	new Gmap_Block_Assets(); // Initialize the class.
}

