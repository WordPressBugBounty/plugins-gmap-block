<?php
/**
 * SDK - Gmap Blocks
 *
 * @since 1.0.5
 * @package GmapBlock
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit; // Exit if accessed directly.
}

/**
 * SDK Integration
 */

if ( ! function_exists( 'gmap_dci_plugin' ) ) {
  function gmap_dci_plugin() {

      // Include DCI SDK.
    require_once dirname( __FILE__ ) . '/dci/start.php';
    wp_register_style('dci-sdk-gmap', plugins_url('sdk/dci/assets/css/dci.css', __FILE__), array(), '1.2.1', 'all');
    wp_enqueue_style('dci-sdk-gmap');

    dci_dynamic_init( array(
      'sdk_version'          => '1.2.1',
      'product_id'           => 11,
      'plugin_name'          => 'Gmap',                                                                                                                                                                        
      'plugin_title'         => 'Love using Gmap? Congrats   ( Never miss an Important Update )',                                                                                                               
      'api_endpoint'         => 'https://dashboard.codedivo.com/wp-json/dci/v1/data-insights',
      'slug'                 => 'no-need',                                                                                                                                                                      
      'core_file'            => false,
      'plugin_deactivate_id' => false,
      'menu'                 => [],
      'public_key'           => 'pk_gtcAgUZHSytFg6J6Z4K7VUyDsD6DKVl6',
      'is_premium'           => false,
      'popup_notice'         => false,
      'deactivate_feedback'  => false,
      'text_domain'          => 'gmap-block',
      'plugin_msg'           => '<p>Be Top-contributor by sharing non-sensitive plugin data and create an impact to the global WordPress community today! You can receive valuable emails periodically.</p>',
    ) );

  }
  add_action( 'admin_init', 'gmap_dci_plugin' );
}